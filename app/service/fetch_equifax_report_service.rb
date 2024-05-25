# frozen_string_literal: true

class FetchEquifaxReportService
  def initialize(params)
    @params = params
    @errors = []
    @report_extra_data = {}
  end

  def fetch
    endpoint = full_url("fetch/equifax_report")
    @serv = adl_post(endpoint, headers(endpoint), @params)
    @serv["response"]
  end

  def result
    @result ||= @serv["response"]
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

  def adl_post(endpoint, headers, data)
    uri = URI(endpoint)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri, headers)
    request.body = data.to_json
    response = http.request(request)
    JSON.parse(response.body)
  end
end
