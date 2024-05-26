# frozen_string_literal: true

class Lendingkart < Base
  attr_reader :user, :loan

  def perform(mobile)
    @user = CustomerInfo.find_by(mobile: mobile)
    @loan = LoanProfile.find_or_create_by(customer_info_id: @user.id, lender_name: "LENDINGKART")
    lead_creation unless dedupe_check
  end

  def dedupe_check
    endpoint = "https://api.lendingkart.com/v2/partner/leads/lead-exists-status"
    response = post(endpoint, dedupe_payload, headers)
    loan.update(response: response, status: response["leadExists"])
    response["leadExists"]
  end

  def lead_creation
    endpoint = "https://api.lendingkart.com/v2/partner/leads/create-application"
    response = post(endpoint, lead_creation_payload, headers)
    loan.update(response: response, status: response["message"], external_loan_id: response["applicationId"], lender_name: "LENDINGKART") if response
  end

  def fetch_status(application_id)
    endpoint = "https://api.lendingkart.com/v2/partner/leads/applicationStatus/#{application_id}"
    response = get(endpoint, headers, nil)
    if response && response["applicationStatus"].present?
      data = LoanProfile.find_by(external_loan_id: application_id)
      data.status = response["applicationStatus"]
      data.rejection_reason = response["rejectionReasons"]&.first if response["rejectionReasons"].present?
      data.save
    end
    response
  end

  def base_url
    ""
  end

  def lead_creation_payload
    {
      firstName:         user.first_name,
      lastName:          user.last_name,
      email:             user.email.strip,
      mobile:            user.mobile,
      businessAge:       36,
      businessRevenue:   user.monthly_income * 12,
      registeredAs:      "Proprietorship",
      personalDob:       user.dob.strftime("%Y-%m-%d"),
      personalPAN:       user.pan_number.upcase,
      gender:            user.gender.strip.upcase,
      cibilConsentForLK: true,
      personalAddress:   {pincode: user.home_pincode, address: user.home_address},
      businessRunBy:     "Self",
      loanAmount:        loan_amount(user.monthly_income),
      businessAddress:   {address: user.business_address, pincode: user.business_pincode},
      productCategory:   "Proprietorship",
      natureOfBusiness:  ["Retailer"],
      uniqueId:          user.id,
      otherFields:       {}
    }
  end

  def dedupe_payload
    {
      mobile: user.mobile,
      email:  user.email.strip
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

  def headers
    {
      "X-Api-Key":    "0fcf2ef8-0aeb-4a65-bca3-beba0e190ca1",
      "Content-Type": "application/json",
      Accept:         "application/json"
    }
  end
end
