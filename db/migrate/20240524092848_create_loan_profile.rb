# frozen_string_literal: true

class CreateLoanProfile < ActiveRecord::Migration[7.1]
  def change
    create_table :loan_profiles do |t|
      t.references :customer_info, null: false, foreign_key: true
      t.references :partner, null: false, foreign_key: true
      t.references :lender, null: true
      t.string :loan_uid
      t.string :external_loan_id
      t.string :uniq_id
      t.string :mobile, limit: 15
      t.decimal :loan_amount
      t.string :name
      t.string :status
      t.string :sub_status
      t.string :message
      t.string :rejection_reason
      t.decimal :amount_offered
      t.decimal :amount_approved
      t.decimal :amount_disbursed
      t.decimal :roi, precision: 5, scale: 2
      t.string :tenure
      t.decimal :processing_fees
      t.datetime :accepted_at
      t.datetime :verified_at
      t.datetime :disbursed_at
      t.datetime :closed_at
      t.datetime :canceled_at
      t.string :partner_code
      t.string :lender_code
      t.string :noc_url
      t.string :tnc_url
      t.string :agreement_url
      t.datetime :joined_on
      t.string :journey_link
      t.string :product_category
      t.string :self_redirection_link
      t.string :other_redirect_link
      t.string :token
      t.jsonb :response
      t.jsonb :request_params

      t.timestamps
    end
  end
end
