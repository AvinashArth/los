# frozen_string_literal: true

class Faircent
  def perform(mobile)
    endpoint = "https://api.faircent.com/v1/api/aggregrator/register/user"
    user = CustomerInfo.find_by(mobile: mobile)
    partner = Partner.find_by(code: user.partner_code)
    loan = LoanProfile.find_or_create_by(customer_info_id: user.id, lender_code: "FAIRCENT", mobile: user.mobile, partner_id: partner.id, partner_code: partner.code)

    unless user && user.monthly_income >= 25_000 && user.age >= 23 && user.age <= 58
      loan.update(rejection_reason: "Age norms not met", status: "REJECTED", name: user.full_name, message: "Age norms not met")
      return
    end

    payload = create_payload(user)
    response = post(endpoint, payload, headers)
    if response["result"].present?
      status = response.dig("result", "status").eql?("Reject") ? "REJECTED" : response.dig("result", "status")
      reason = status.downcase == "reject" ? (response.dig("result", "msg") || "Bureau Rejected") : ""
      amount_offered = response.dig("result", "offer_amount") || 0
      offer_roi = response.dig("result", "offer_roi") || 0
      offer_pf = response.dig("result", "offer_pf") || 0

      loan.update(response: response, status: status.upcase, external_loan_id: response.dig("result", "loan_id"), rejection_reason: reason, amount_offered: amount_offered, roi: offer_roi, processing_fees: offer_pf, name: user.full_name, message: reason)
    else
      reason = "Duplicate Lead" if response["message"] == "PAN Already Exists"
      loan.update(response: response, status: "REJECTED", rejection_reason: reason, name: user.full_name, message: reason)
    end
  end

  def create_payload(user)
    {
      fname:             fname(user),
      lname:             lname(user),
      dob:               dob(user),
      pan:               user.pan_number.upcase,
      mobile:            user.mobile,
      mail:              user.email.strip,
      pin:               user.home_pincode,
      state:             user.home_state,
      city:              user.home_city,
      address:           user.home_address,
      gender:            user.gender.strip[0].capitalize,
      employment_status: "Self Employed",
      loan_purpose:      "90156671",
      loan_amount:       loan_amount(user.monthly_income),
      monthly_income:    user.monthly_income
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

  def fname(user)
    parts = user.first_name.split
    parts.length >= 2 ? parts[0] : user.first_name
  end

  def lname(user)
    parts = user.last_name.split
    parts.length > 1 ? user.last_name : user.first_name
  end

  def dob(user)
    user.dob.strftime("%Y-%m-%d")
  end

  def headers
    {
      "x-application-id":   "5b3ec5c6f0a779bb18df8a8ac054d759",
      "x-application-name": "HAPPYLOAN",
      "Content-Type":       "application/json"
    }
  end

  def post(endpoint, data, headers)
    uri = URI(endpoint)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri.path, headers)
    request.body = data.to_json
    response = http.request(request)
    JSON.parse(response.read_body)
  end
end
