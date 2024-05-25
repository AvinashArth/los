# frozen_string_literal: true

class CreateCustomerInfo < ActiveRecord::Migration[7.1]
  def change
    create_table :customer_infos do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.string :full_name
      t.date :dob
      t.string :email
      t.string :mobile
      t.string :gender
      t.integer :age
      t.string :marital_status
      t.string :occupation_category
      t.decimal :monthly_income
      t.string :loan_category
      t.string :type_of_loan
      t.string :photo_url
      t.string :pan_img_url
      t.string :shop_img_url
      t.string :aadhaar_img_url
      t.string :bank_pdf_url
      t.string :home_address
      t.string :home_city
      t.string :home_state
      t.string :home_pincode
      t.string :business_address
      t.string :business_city
      t.string :business_state
      t.string :business_pincode
      t.integer :business_age
      t.string :guardian_name
      t.string :relation_with_guardian
      t.string :guardian_occupation
      t.string :guardian_mobile
      t.string :alternate_mobile_number
      t.string :other_occupation
      t.string :education_level
      t.string :insurance
      t.string :shop_type
      t.string :business_type
      t.string :shop_road_type
      t.string :employment_type
      t.string :salary_received_type
      t.string :company_name
      t.float :loan_amount
      t.float :offered_amount
      t.boolean :is_bureau_approved
      t.boolean :is_pincode_approved
      t.string :ro_office_name
      t.float :distance_from_ro
      t.float :cust_lat
      t.float :cust_lon
      t.integer :bureau_score
      t.string :lender_code
      t.string :partner_code
      t.string :external_loan_id
      t.integer :turnover
      t.string :pan_number
      t.string :aadhaar_number
      t.string :spouse_name
      t.string :spouse_gender
      t.float :accuracy
      t.float :longitude
      t.float :latitude
      t.string :cms_txn_id
      t.string :cams_client_id
      t.string :status
      t.string :sub_status
      t.string :self_redirection_link
      t.string :other_redirect_link
      t.string :token

      t.timestamps
    end
  end
end
