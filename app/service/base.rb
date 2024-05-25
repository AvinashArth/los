# frozen_string_literal: true

class Base
  def post(endpoint, data, headers)
    uri = URI(endpoint)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri.path, headers)
    request.body = data.to_json
    response = http.request(request)
    JSON.parse(response.read_body)
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

  def get(endpoint, headers, _payload)
    uri = URI(base_url + endpoint)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri, headers)
    response = http.request(request)
    JSON.parse(response.body)
  end
end
