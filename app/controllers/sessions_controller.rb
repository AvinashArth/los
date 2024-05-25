# frozen_string_literal: true

class SessionsController < ApplicationController
  # before_action :authorize_request, only: [:logout]
  skip_before_action :verify_authenticity_token, only: %i[create login logout]

  # POST /signup
  def create
    if User.exists?(email: user_params[:email])
      render json: {errors: ["Email already exists"]}, status: :unprocessable_entity
    else
      @user = User.new(user_params)
      if @user.save
        render json: {status: "User created successfully"}, status: :ok
      else
        render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end

  # POST /login
  def login
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      token = encode_token({user_id: @user.id})
      @user.update(token: token)
      render json: {token: token, msg: "Login successful", user: @user}, status: :ok
    else
      render json: {errors: "Invalid email or password"}, status: :unauthorized
    end
  end

  # DELETE /logout
  def logout
    render json: {status: "Logged out successfully"}, status: :ok
  end

  private

  def user_params
    params.require(:session).permit(:name, :mobile, :email, :password, :role, :logo, :address, :city, :state)
  end
end
