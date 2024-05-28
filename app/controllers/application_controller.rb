# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  attr_reader :current_user

  def encode_token(payload)
    secret_key = Rails.application.secrets.secret_key_base
    encoded_token = JWT.encode(payload, secret_key, 'HS256')
    encoded_token
  end

  def decode_token(token)
    secret_key = Rails.application.secrets.secret_key_base
    decoded_token = JWT.decode(token, secret_key, true, algorithm: 'HS256')[0]
    HashWithIndifferentAccess.new(decoded_token)
  rescue JWT::DecodeError => e
    puts "JWT Decode Error: #{e.message}"
    nil
  end

  def authorize_request
    header = request.headers["Authorization"]
    header = header.split.last if header
    decoded = decode_token(header)
    @current_user = User.find(decoded[:user_id]) if decoded
    @current_user.present?
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError
    render json: {errors: "Unauthorized request"}, status: :unauthorized
  end

  def verify_authenticity_token
    if request.format.json?
      true
    else
      true
    end
  end

  private

  def allowed_origin?
    request.headers["HTTP_ORIGIN"] == ENV["AI_LOS_API_URL"]
  end
end
