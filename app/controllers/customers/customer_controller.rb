# frozen_string_literal: true

class CustomersController < ApplicationController
  before_action :require_login

  def some_action
    @current_user = current_user
  end

  def dashboard
    @customers = CustomerInfo.all
    @customer_data = @customers.group_by_month(:created_at).count.map {|date, count| [date.to_time.to_i * 1000, count] }
  end

  def fetch
    @customers = if current_user.role.downcase == "admin"
                   CustomerInfo.left_joins(:loan_profiles)
                               .select("customer_infos.id, customer_infos.first_name, customer_infos.last_name, customer_infos.mobile, customer_infos.offered_amount, customer_infos.created_at, customer_infos.rejection_reason, customer_infos.partner_code, COALESCE(loan_profiles.status, '') as status, COALESCE(loan_profiles.external_loan_id, '') as loan_uid, COALESCE(loan_profiles.rejection_reason, '') as rejection_reason, COALESCE(loan_profiles.lender_name, '') as lender_code")
                               .order("customer_infos.id DESC")
                               .page(params[:page]).per(10)
                 else
                   CustomerInfo.left_joins(:loan_profiles)
                               .where(partner_code: current_user.code)
                               .select("customer_infos.id, customer_infos.first_name, customer_infos.last_name, customer_infos.mobile, customer_infos.offered_amount, customer_infos.created_at, customer_infos.rejection_reason, customer_infos.partner_code,
                              COALESCE(loan_profiles.status, '') as status, COALESCE(loan_profiles.external_loan_id, '') as loan_uid, COALESCE(loan_profiles.rejection_reason, '') as rejection_reason,
                              CASE
                                WHEN loan_profiles.lender_name = 'ARTH' THEN 'L1'
                                WHEN loan_profiles.lender_name = 'FAIRCENT' THEN 'L2'
                                WHEN loan_profiles.lender_name = 'LENDINGKART' THEN 'L3'
                                ELSE 'Unknown'
                              END as lender_code")
                               .order("customer_infos.id DESC")
                               .page(params[:page]).per(10)
                 end
    render :fetch
  end

  def filter
    filter = params[:filter]
    @customers = CustomerInfo.all

    @customers = if current_user.role.downcase == "admin"
                   @customers.left_joins(:loan_profiles)
                             .where("customer_infos.mobile = ? OR loan_profiles.external_loan_id = ?", filter, filter)
                             .select("customer_infos.id, customer_infos.first_name, customer_infos.last_name, customer_infos.mobile, customer_infos.offered_amount, customer_infos.created_at, customer_infos.rejection_reason, COALESCE(loan_profiles.status, '') as status, COALESCE(loan_profiles.external_loan_id, '') as loan_uid, COALESCE(loan_profiles.lender_name, '') as lender_name, COALESCE(loan_profiles.rejection_reason, '') as rejection_reason")
                             .order("customer_infos.id DESC")
                 else
                   @customers.left_joins(:loan_profiles)
                             .where(partner_code: current_user.code)
                             .where("customer_infos.mobile = ? OR loan_profiles.external_loan_id = ?", filter, filter)
                             .select("customer_infos.id, customer_infos.first_name, customer_infos.last_name, customer_infos.mobile, customer_infos.offered_amount, customer_infos.created_at, customer_infos.rejection_reason, COALESCE(loan_profiles.status, '') as status, COALESCE(loan_profiles.external_loan_id, '') as loan_uid, COALESCE(loan_profiles.lender_name, '') as lender_name, COALESCE(loan_profiles.rejection_reason, '') as rejection_reason")
                             .order("customer_infos.id DESC")
                 end
    @customers = Kaminari.paginate_array(@customers).page(params[:page]).per(10)
    render json: @customers
  end

  def update
    customer_info = CustomerInfo.find(params[:id])
    if customer_info.update(customer_info_params)
      render json: customer_info, status: :ok
    else
      render json: customer_info.errors, status: :unprocessable_entity
    end
  end

  private

  def require_login
    return if current_user

    flash[:error] = "You must be logged in to access this page."
    redirect_to "/user_login"
  end

  def customer_info_params
    params.require(:customer_info).permit(:first_name, :last_name, :dob, :pan_number, :mobile, :email, :guardian_name, :gender, :education_level, :home_city, :home_state, :business_city, :loan_amount,
                                          :insurance, :shop_type, :business_type, :guardian_occupation, :shop_road_type, :shop_img_url, :other_occupation, :monthly_income, :business_state,
                                          :type_of_loan, :home_address, :home_pincode, :business_address, :business_pincode, :partner_code, :company_name, :employment_type, :salary_received_type)
          .merge(latitude: params[:latitude], longitude: params[:longitude], accuracy: params[:accuracy], occupation_category: params[:occupation_category], relation_with_guardian: params[:relation_with_guardian], loan_category: params[:loan_category])
  end
end
