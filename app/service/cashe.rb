# frozen_string_literal: true

require "json"
require "openssl"
require "base64"

class Cashe
  def perform(mobile)
    @auth_key = "'`h_+x|cTvUg;Md%"
    @user = CustomerInfo.find_by(mobile: mobile)
    partner = Partner.find_by(code: user.partner_code)
    @loan = LoanProfile.find_or_create_by(customer_info_id: @user.id, lender_name: "CASHE", mobile: user.mobile, partner_id: partner.id, partner_code: partner.code)
    dedupe_check
  end

  attr_reader :user, :loan, :auth_key

  def dedupe_check
    endpoint = "https://test-partners.cashe.co.in/partner/checkDuplicateCustomerInfo"
    payload = dedupe_params
    key = hmac_encrypt(payload, auth_key)
    headers = headers(key)
    response = post(endpoint, payload, headers)
    if response["duplicateStatusCode"] == 3
      loan.update(response: response, status: "Rejected", rejection_reason: "Duplicate lead", name: user.full_name)
    else
      pre_approval
    end
  end

  def pre_approval
    endpoint = "https://test-partners.cashe.co.in/report/getLoanApprovalDetails"
    payload = pre_approval_params
    key = hmac_encrypt(payload, auth_key)
    headers = headers(key)
    response = post(endpoint, payload, headers)
    if response["payLoad"].present? && %w[pre_approved pre_qualified_high pre_qualified_low].include?(response["payLoad"]["status"])
      loan.update(response: response, status: "Approved", amount: response["payLoad"]["amount"] || 0, name: user.full_name)
      create_customer
    else
      loan.update(response: response, status: response["payLoad"]["status"], rejection_reason: "Ineligible", name: user.full_name)
    end
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
      state:              state_mapping[user.home_state],
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
        State:                              state_mapping[user.home_state],
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

  def state_mapping
    {
      "andamanandnicobarislands" => "ANDAMAN & NICOBAR ISLANDS",
      "andaman&nicobar"          => "ANDAMAN & NICOBAR ISLANDS",
      "andhrapradesh"            => "ANDHRA PRADESH",
      "arunachalpradesh"         => "ARUNACHAL PRADESH",
      "assam"                    => "ASSAM",
      "bihar"                    => "BIHAR",
      "chandigarh"               => "CHANDIGARH",
      "chattisgarh"              => "CHATTISGARH",
      "dadraandnagarhaveli"      => "DADRA & NAGAR HAVELI",
      "damananddiu"              => "DAMAN & DIU",
      "daman&diu"                => "DAMAN & DIU",
      "delhi"                    => "DELHI",
      "goa"                      => "GOA",
      "gujarat"                  => "GUJARAT",
      "haryana"                  => "HARYANA",
      "himachalpradesh"          => "HIMACHAL PRADESH",
      "jammuandkashmir"          => "JAMMU AND KASHMIR",
      "jammu&kashmir"            => "JAMMU AND KASHMIR",
      "jharkhand"                => "JHARKHAND",
      "karnataka"                => "KARNATAKA",
      "kerala"                   => "KERALA",
      "lakshadweepislands"       => "LAKSHADWEEP",
      "lakshadweep"              => "LAKSHADWEEP",
      "madhyapradesh"            => "MADHYA PRADESH",
      "maharashtra"              => "MAHARASHTRA",
      "manipur"                  => "MANIPUR",
      "meghalaya"                => "MEGHALAYA",
      "mizoram"                  => "MIZORAM",
      "nagaland"                 => "NAGALAND",
      "odisha"                   => "ODISHA",
      "orissa"                   => "ODISHA",
      "pondicherry"              => "PUDUCHERRY",
      "punjab"                   => "PUNJAB",
      "rajasthan"                => "RAJASTHAN",
      "sikkim"                   => "SIKKIM",
      "tamilnadu"                => "TAMIL NADU",
      "telangana"                => "TELANGANA",
      "tripura"                  => "TRIPURA",
      "uttarpradesh"             => "UTTAR PRADESH",
      "uttarakhand"              => "UTTARAKHAND",
      "uttaranchal"              => "UTTARAKHAND",
      "westbengal"               => "WEST BENGAL"
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
    user.dob.strftime("%Y-%m-%d 00:00:00")
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

  def base_url
    ENV.fetch("CASHE_BASE_URL", nil)
  end
end
