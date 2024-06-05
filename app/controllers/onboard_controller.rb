# frozen_string_literal: true

class OnboardController < ApplicationController
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, only: %i[upload_image_to_s3]

  def onboard
    @customer_info = CustomerInfo.new
    @state_codes = state_codes.map {|name| name.to_s.titleize }.compact
  end

  def create
    @customer_info = CustomerInfo.find_or_initialize_by(mobile: customer_info_params[:mobile].squish)
    @customer_info.assign_attributes(customer_info_params)

    dob = Date.parse(customer_info_params[:dob])
    age = (Time.zone.now - dob.to_time) / 1.year.seconds

    if @customer_info.save
      message, id, status = if customer_info_params[:loan_category] == "personal_loan"
                              resp = Cashe.new.perform(@customer_info.mobile)
                              [resp,  @customer_info.id, :ok]
                            elsif age < 21 || age > 55
                              ["You are not eligible because age must be between 21 and 55 years.", @customer_info.id, :ok]
                            else
                              ["Your data has been saved successfully. Our team will contact you to meet your requirements soon.", @customer_info.id, :ok]
                            end
    else
      message = @customer_info.errors.full_messages
      status = :unprocessable_entity
      id = nil
    end

    render json: {message: message, id: id, status: status}
  end

  def fetch_equifax_report
    return true
    serv = EquifaxReportService.new(equifax_payload) # rubocop:disable Lint/UnreachableCode
    resp = serv.result if serv.fetch

    @is_bureau_approved = if resp && (resp["credit_score"].to_i >= 650 || resp["credit_score"].to_i <= 6)
                            resp["no_of_active_accounts"].to_i <= 5 && resp["total_balance_amount"].to_i <= 500_000
                          else
                            false
                          end

    @customer_info.update(bureau_score: resp["credit_score"], equifax_response: resp, is_bureau_approved: @is_bureau_approved)
    Faircent.new.perform(@customer_info.mobile) unless @is_bureau_approved
    Lendingkart.new.perform(@customer_info.mobile)
    Cashe.new.perform(@customer_info.mobile)
  end

  def upload_image_to_s3
    cust = CustomerInfo.find(params[:id])
    base64data = params[:base64data]
    image_key = params[:imageKey]

    if base64data && image_key
      s3_url = upload(base64data, image_key, cust.mobile)
      if s3_url
        key = image_key == "selfie" ? :photo_url : :shop_img_url
        cust.update(key => s3_url)
        render json: {message: "Images uploaded successfully", status: 200}
      else
        render json: {error: "Failed to upload images", status: 400}
      end
    else
      render json: {error: "Missing required parameters", status: 400}
    end
  end

  def user_consent
    @mobile = params[:mobile]
    @customer = CustomerInfo.find_by(mobile: @mobile)
  end

  def save
    mobile = params[:mobile]
    @customer = CustomerInfo.find_or_initialize_by(mobile: mobile)
    if @customer.update(cust_lat: params[:latitude], cust_lon: params[:longitude])
      render json: {message: "Thanks for your consent. Our team will contact you to meet your requirements soon", status: 200}
    else
      render json: {message: @customer.errors.full_messages, status: 400}
    end
  end

  private

  def upload(base64data, image_key, mobile)
    s3 = Aws::S3::Resource.new
    decoded_image = Base64.decode64(base64data)

    image = MiniMagick::Image.read(decoded_image)
    timestamp = Time.now.strftime("%Y%m%d%H%M%S")
    filename = "#{image_key}_#{timestamp}_#{mobile}.#{ext_for(image.mime_type)}"
    object_key = "arth_happy_tide/#{filename}"
    bucket_name = "arthimpact-athos-#{CURRENT_ENV}-eabe0xpfef"

    obj = s3.bucket(bucket_name).object(object_key)
    return obj.public_url if obj.exists?

    obj.put(body: image.to_blob, acl: "public-read", content_type: image.mime_type)

    s3_presigner = Aws::S3::Presigner.new
    s3_presigner.presigned_url(:get_object, bucket: bucket_name, key: object_key, expires_in: nil)
  rescue StandardError => e
    Rails.logger.error("#{e.message} failed to upload and generate presigned URL")
    nil
  end

  def ext_for(mime_type)
    mime_type.split("/").last
  end

  def state_codes
    [
      "andhrapradesh", "arunachalpradesh", "assam", "bihar", "chattisgarh", "delhi", "goa", "gujarat", "haryana", "himachalpradesh", "jammuandkashmir",
      "jammu&kashmir", "jharkhand", "karnataka", "kerala", "lakshadweepislands", "lakshadweep", "madhyapradesh", "maharashtra", "manipur", "meghalaya",
      "mizoram", "nagaland", "odisha", "orissa", "pondicherry", "punjab", "rajasthan", "sikkim", "tamilnadu", "telangana", "tripura", "uttarpradesh",
      "uttarakhand", "westbengal", "andamanandnicobarislands", "andaman&nicobar", "chandigarh", "dadraandnagarhaveli", "damananddiu", "daman&diu",
      "otherterritory", "Uttaranchal"
    ]
  end

  def equifax_payload
    {
      name:       customer_info_params[:name],
      first_name: customer_info_params[:first_name],
      last_name:  customer_info_params[:last_name],
      address:    customer_info_params[:home_address],
      pincode:    customer_info_params[:home_pincode],
      state:      customer_info_params[:home_state],
      birthdate:  customer_info_params[:dob],
      mobile:     customer_info_params[:mobile],
      pan:        customer_info_params[:pan_number]
    }
  end

  def customer_info_params
    params.require(:onboard).permit(
      :first_name, :last_name, :guardian_name, :relation_with_guardian, :guardian_occupation, :dob, :pan_number, :partner_code,
      :mobile, :email, :gender, :occupation_category, :other_occupation, :business_type, :monthly_income, :loan_amount, :loan_category,
      :employment_type, :salary_received_type, :company_name, :type_of_loan, :shop_type, :education_level, :insurance, :shop_road_type,
      :home_address, :home_city, :home_state, :home_pincode, :business_address, :business_city, :business_state, :business_pincode,
      :latitude, :longitude, :accuracy
    )
  end
end
