# frozen_string_literal: true

class Arth
  attr_reader :mobile, :error_code, :result, :customer_info_id

  def initialize(mobile)
    @user = CustomerInfo.find_by(mobile: mobile)
    @customer_info_id = @user.id
    partner = Partner.find_by(code: user.partner_code)
    @loan = LoanProfile.find_or_create_by(customer_info_id: @user.id, lender_code: "ARTH", mobile: user.mobile, partner_id: partner.id, partner_code: partner.code)
    dedupe_check
    @error_code = "INVALID"
  end

  def prequalification
    endpoint = full_url("pre_qualification/#{customer_info_id}")
    serv = get(endpoint, headers(endpoint), nil)
    if serv["response"] && serv["response"]["prequalification"]
      check_offer(serv["response"])
    else
      [false, "Prequalification not Found"]
    end
  end

  def fetch_loan_details
    endpoint = full_url("loan/profile/#{customer_info_id}")
    serv = get(endpoint, headers(endpoint), nil)
    if serv["response"] && serv["response"]["loan_status"]
      update(serv["response"])
    else
      [false, "Loan not Found"]
    end
  end

  def create_signature(full_url)
    api_salt = ENV.fetch("ARTH_API_SALT", nil)
    api_key = ENV.fetch("ARTH_API_KEY", nil)
    signature = [api_salt, api_key, full_url].join("|")
    OpenSSL::HMAC.hexdigest("SHA256", api_key, signature)
  end

  def full_url(path)
    timestamp = Time.zone.now.to_i
    "#{ENV.fetch('ARTH_URL', nil)}/#{path}?sent_at=#{timestamp}"
  end

  def headers(full_url)
    {
      "Content-Type" => "application/json",
      "x-api-key"    => ENV.fetch("ARTH_API_KEY", nil),
      "X-Signature"  => create_signature(full_url)
    }
  end

  def get(endpoint, headers, _payload)
    uri = URI(base_url + endpoint)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri, headers)
    response = http.request(request)
    JSON.parse(response.body)
  end

  def soa
    @soa ||= SoaV2.new
  end

  def base_url
    ENV.fetch("ARTH_BASE_URL")
  end

  def request_ref
    @request_ref ||= SecureRandom.uuid
  end

  def update(response)
    customer_info = CustomerInfo.find(customer_info_id)
    attributes = {
      lender_code:      response["lender_code"],
      status:           response["status"],
      rejection_reason: response["private_reason"],
      accepted_at:      response["accepted_at"],
      kyc_on_hold_at:   response["kyc_on_hold_at"],
      product_code:     response["product_code"],
      customer_code:    response["customer_code"],
      partner_code:     response["partner_code"],
      loan_uid:         response["loan_uid"],
      disburse_amount:  response["amount_disbursed"],
      other_details:    {humanized_reason => response["humanized_reason"],
                         requested_at     => response["requested_at"],
                         rejected_at      => response["rejected_at"],
                         approved_at      => response["approved_at"]},
      product_category: response["tenure"],
      disbursed_at:     response["disbursed_at"]
    }

    if customer_info.update(attributes.compact)
      [@customer_info_id, true]
    else
      [@customer_info_id, false]
    end
  end

  def check_offer(response)
    customer_info = CustomerInfo.find(customer_info_id)
    attributes = {
      status:         response["status"],
      offered_at:     response["offered_at"],
      joined_on:      response["joined_on"],
      product_code:   response["product_code"],
      customer_code:  response["customer_code"],
      offered_amount: response["offered_amount"],
      journey_link:   response["journey_link"]
    }

    if customer_info.update(attributes.compact)
      [@customer_info_id, true]
    else
      [@customer_info_id, false]
    end
  end
end
