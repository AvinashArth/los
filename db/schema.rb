# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_26_100008) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customer_infos", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "middle_name"
    t.string "full_name"
    t.date "dob"
    t.string "email"
    t.string "mobile"
    t.string "gender"
    t.integer "age"
    t.string "marital_status"
    t.string "occupation_category"
    t.decimal "monthly_income"
    t.string "loan_category"
    t.string "type_of_loan"
    t.string "photo_url"
    t.string "pan_img_url"
    t.string "shop_img_url"
    t.string "aadhaar_img_url"
    t.string "bank_pdf_url"
    t.string "home_address"
    t.string "home_city"
    t.string "home_state"
    t.string "home_pincode"
    t.string "business_address"
    t.string "business_city"
    t.string "business_state"
    t.string "business_pincode"
    t.integer "business_age"
    t.string "guardian_name"
    t.string "relation_with_guardian"
    t.string "guardian_occupation"
    t.string "guardian_mobile"
    t.string "alternate_mobile_number"
    t.string "other_occupation"
    t.string "education_level"
    t.string "insurance"
    t.string "shop_type"
    t.string "business_type"
    t.string "shop_road_type"
    t.string "employment_type"
    t.string "salary_received_type"
    t.string "company_name"
    t.float "loan_amount"
    t.float "offered_amount"
    t.boolean "is_bureau_approved"
    t.boolean "is_pincode_approved"
    t.string "ro_office_name"
    t.float "distance_from_ro"
    t.float "cust_lat"
    t.float "cust_lon"
    t.integer "bureau_score"
    t.string "lender_code"
    t.string "partner_code"
    t.string "external_loan_id"
    t.integer "turnover"
    t.string "pan_number"
    t.string "aadhaar_number"
    t.string "spouse_name"
    t.string "spouse_gender"
    t.float "accuracy"
    t.float "longitude"
    t.float "latitude"
    t.string "cms_txn_id"
    t.string "cams_client_id"
    t.string "status"
    t.string "sub_status"
    t.string "self_redirection_link"
    t.string "other_redirect_link"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lenders", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.string "uid"
    t.string "mobile"
    t.string "business_category"
    t.string "slug"
    t.string "register_name"
    t.string "nda_url"
    t.string "agreement_url"
    t.string "headquarter"
    t.string "contact_address"
    t.integer "max_cap"
    t.integer "min_cap"
    t.string "website"
    t.integer "total_lead"
    t.boolean "is_active", default: true
    t.string "logo"
    t.boolean "verified", default: false
    t.string "noc_url"
    t.string "gstin"
    t.string "gstin_address"
    t.datetime "invoice_date"
    t.string "bank_name"
    t.string "ifsc_code"
    t.string "acc_holder_name"
    t.string "acc_number"
    t.string "email"
    t.string "branch"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "loan_profiles", force: :cascade do |t|
    t.bigint "customer_info_id", null: false
    t.bigint "partner_id", null: false
    t.bigint "lender_id"
    t.string "loan_uid"
    t.string "external_loan_id"
    t.string "uniq_id"
    t.string "mobile", limit: 15
    t.decimal "loan_amount"
    t.string "name"
    t.string "status"
    t.string "sub_status"
    t.string "message"
    t.string "rejection_reason"
    t.decimal "amount_offered"
    t.decimal "amount_approved"
    t.decimal "amount_disbursed"
    t.decimal "roi", precision: 5, scale: 2
    t.string "tenure"
    t.decimal "processing_fees"
    t.datetime "accepted_at"
    t.datetime "verified_at"
    t.datetime "disbursed_at"
    t.datetime "closed_at"
    t.datetime "canceled_at"
    t.string "partner_code"
    t.string "lender_code"
    t.string "noc_url"
    t.string "tnc_url"
    t.string "agreement_url"
    t.datetime "joined_on"
    t.string "journey_link"
    t.string "product_category"
    t.string "self_redirection_link"
    t.string "other_redirect_link"
    t.string "token"
    t.jsonb "response"
    t.jsonb "request_params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_info_id"], name: "index_loan_profiles_on_customer_info_id"
    t.index ["lender_id"], name: "index_loan_profiles_on_lender_id"
    t.index ["partner_id"], name: "index_loan_profiles_on_partner_id"
  end

  create_table "partners", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.string "uid"
    t.string "mobile"
    t.string "business_category"
    t.string "slug"
    t.string "register_name"
    t.string "nda_url"
    t.string "agreement_url"
    t.string "headquarter"
    t.string "contact_address"
    t.string "website"
    t.integer "total_lead"
    t.boolean "is_active", default: true
    t.string "logo"
    t.boolean "verified", default: false
    t.string "noc_url"
    t.string "gstin"
    t.string "gstin_address"
    t.datetime "invoice_date"
    t.string "bank_name"
    t.string "ifsc_code"
    t.string "acc_holder_name"
    t.string "acc_number"
    t.string "email"
    t.string "branch"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_queries", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "email"
    t.string "role"
    t.string "number"
    t.text "message"
    t.string "address"
    t.string "website"
    t.string "company_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_queries_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "mobile"
    t.string "email", null: false
    t.string "password_digest"
    t.datetime "last_sign_in_at"
    t.date "dob"
    t.string "otp"
    t.string "company_name"
    t.string "role"
    t.string "role_code"
    t.integer "role_id"
    t.string "logo"
    t.string "selfie_url"
    t.string "old_password"
    t.text "address"
    t.string "city"
    t.string "state"
    t.string "token"
    t.text "permissions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "loan_profiles", "customer_infos"
  add_foreign_key "loan_profiles", "partners"
  add_foreign_key "user_queries", "users"
end
