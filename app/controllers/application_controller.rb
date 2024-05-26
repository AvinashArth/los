# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base, "HS256")
  end

  def decode_token(token)
    JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
    HashWithIndifferentAccess.new(decoded[0])
  end

  def authorize_request
    header = request.headers["Authorization"]
    header = header.split.last if header
    decoded = decode_token(header)
    @current_user = User.find(decoded[:user_id]) if decoded
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError
    render json: {errors: "Unauthorized request"}, status: :unauthorized
  end

  def verify_authenticity_token
    if request.format.json?
      true
    else
      super
    end
  end

  private

  def allowed_origin?
    request.headers["HTTP_ORIGIN"] == ENV["AI_ATHOS_API_URL"]
  end

  def current_user
    @current_user ||= Users.find_by(id: session[:user_id])
  end
end
