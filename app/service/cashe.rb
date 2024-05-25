# frozen_string_literal: true

require "json"
require "openssl"
require "base64"

class Cashe
  def perform(mobile)
    @auth_key = "'`h_+x|cTvUg;Md%"
    @user = CustomerLead.find_by(mobile: mobile)
    @loan = CustomerLenderMapping.find_or_create_by(customer_lead_id: @user.id, lender_name: "CASHE")
    dedupe_check
  end

  attr_reader :user, :loan, :auth_key

  def dedupe_check
    endpoint = "https://test-partners.cashe.co.in/partner/checkDuplicateCustomerLead"
    payload = dedupe_params
    key = hmac_encrypt(payload, auth_key)
    headers = headers(key)
    response = post(endpoint, payload, headers)
    loan.update(response: response, status: "Rejected", rejection_reason: "Duplicate lead received from some other domain.") if response["duplicateStatusCode"] == 3
    response["duplicateStatusCode"]
  end

  def pres_approval
    endpoint = "https://test-partners.cashe.co.in/report/getLoanApprovalDetails"
    payload = pre_approval_params
    key = hmac_encrypt(payload, auth_key)
    headers = headers(key)
    response = post(endpoint, payload, headers)
    loan.update(response: response, status: response["payLoad"]["status"], amount: response["payLoad"]["amount"] || 0) if response["payLoad"].present?
  end

  def fetch_plan
    endpoint = "https://test-partners.cashe.co.in/partner/fetchCashePlans/salary"
    payload = {partner_name: "Happyness_partner_qa", salary: user.monthly_income}
    key = hmac_encrypt(payload, auth_key)
    headers = headers(key)
    post(endpoint, payload, headers)
  end

  def create_customer
    endpoint = "https://api.lendingkart.com/v2/partner/leads/create-application"
    payload = create_customer_params
    key = hmac_encrypt(payload, auth_key)
    headers = headers(key)
    post(endpoint, payload, headers)
  end

  def check_status
    endpoint = "https://test-partners.cashe.co.in/partner/customer_status"
    payload = {partner_name: "Happyness_partner_qa", partner_customer_id: loan.external_loan_id}
    key = hmac_encrypt(payload, auth_key)
    headers = headers(key)
    post(endpoint, payload, headers)
  end

  def dedupe_params
    {
      partner_name: "Happyness_partner_qa",
      mobile_no:    user.mobile,
      email_id:     user.email
    }
  end

  def pre_approval_params
    {
      partner_name:       "Happyness_partner_qa",
      name:               use.first_name + user.last_name,
      dob:                dob(user),
      pan:                user.pan_number.upcase,
      mobileNo:           user.mobile,
      emailId:            user.email.strip,
      state:              user.home_state.upcase,
      city:               user.home_city,
      addressLine1:       user.home_address,
      locality:           user.home_address,
      pinCode:            user.home_pincode,
      gender:             user.gender.strip[0].capitalize,
      loanAmount:         loan_amount(user.monthly_income),
      salary:             user.monthly_income,
      employmentType:     user.employment_type,
      salaryReceivedType: user.salary_received_type,
      companyName:        user.company_name
    }
  end

  def create_customer_params
    {
      partner_name:            "Happyness_partner_qa",
      reference_Id:            "",
      applicant_id:            user.id.to_s,
      loan_amount:             loan_amount(user.monthly_income),
      product_type_name:       "CASHe_90",
      "Personal Information":  {
        "First Name":                       user.first_name,
        "Last Name":                        user.last_name,
        DOB:                                dob(user),
        Gender:                             user.gender.strip[0].capitalize,
        "Address Line 1":                   user.home_address,
        "Address Line 2":                   user.home_address,
        "Landmark (Address Line 3)":        user.home_address,
        Pincode:                            user.home_pincode,
        City:                               user.home_city,
        State:                              user.home_state,
        "Type of Accommodation":            "",
        PAN:                                user.pan_number,
        Aadhaar:                            "",
        "Highest Qualification":            user.education_level,
        residing_with:                      "",
        number_of_years_at_current_address: "",
        marital_status:                     "",
        spouse_employment_status:           "",
        number_of_kids:                     ""
      },
      "Applicant Information": {
        "Company Name":                    user.company_name,
        "Office Phone no":                 "",
        Designation:                       "",
        "Monthly Income":                  user.monthly_income,
        "Number of Years in Current Work": "",
        "Official Email":                  "",
        "Office Address 1":                "",
        "Office Address 2":                "",
        "Landmark (Office)":               "",
        "Office Pincode":                  "",
        "Office City":                     "",
        "Office State":                    "",
        "Working Since":                   "",
        "Employment Type":                 user.employment_type,
        "Salary ReceivedTypeId":           user.salary_received_type,
        work_sector:                       "",
        job_function:                      "",
        organization:                      ""
      },
      "Financial Information": {
        "Primary Existing Bank Name": "",
        "Account number":             "",
        "IFSC Code":                  ""
      },
      "Partner Bank Details":  {
        "Primary Existing Bank Name": "",
        "Account number":             "",
        "IFSC Code":                  "",
        Remarks:                      ""
      },
      "Contact Information":   {
        Mobile:     user.mobile,
        "Email Id": user.email
      },
      "e-KYC Customer":        {
        poa:                  {
          co:      "",
          street:  "",
          house:   "",
          lm:      "",
          vtc:     "",
          subdist: "",
          dist:    "",
          state:   "",
          pc:      "",
          po:      ""
        },
        aadhar_no:            "",
        name:                 "",
        dob:                  "",
        gender:               user.gender.strip[0].capitalize,
        "compressed-address": user.home_address
      }
    }
  end

  def loan_amount(salary)
    case salary
    when 25_000..40_000
      50_000
    when 40_001..50_000
      75_000
    when 50_001..75_000
      100_000
    when 75_001..100_000
      125_000
    when 100_001..125_000
      150_000
    when 125_001..150_000
      200_000
    when 150_001..200_000
      500_000
    else
      0.0
    end
  end

  def dob(user)
    user.dob.strftime("%Y-%m-%d")
  end

  def headers(key)
    {
      "Check-Sum":    key,
      "Content-Type": "application/json"
    }
  end

  def hmac_encrypt(data, key)
    data_json = data.to_json
    hmac = OpenSSL::HMAC.digest("sha1", key, data_json)
    Base64.strict_encode64(hmac)
  end

  def post(endpoint, data, headers)
    uri = URI.parse(endpoint)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri, headers)
    request.body = data.to_json
    puts(http.set_debug_output($stdout))
    response = http.request(request)
    JSON.parse(response.read_body)
  end
end
