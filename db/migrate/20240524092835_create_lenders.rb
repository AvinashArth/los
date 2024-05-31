# frozen_string_literal: true

class CreateLenders < ActiveRecord::Migration[7.1]
  def change
    create_table :lenders do |t|
      t.string :name
      t.string :code
      t.string :uid
      t.string :mobile
      t.string :business_category
      t.string :slug
      t.string :register_name
      t.string :nda_url
      t.string :agreement_url
      t.string :headquarter
      t.string :contact_address
      t.integer :max_cap
      t.integer :min_cap
      t.string :website
      t.integer :total_lead
      t.boolean :is_active, default: true
      t.string :logo
      t.boolean :verified, default: false
      t.string :noc_url
      t.string :gstin
      t.string :gstin_address
      t.datetime :invoice_date
      t.string :bank_name
      t.string :ifsc_code
      t.string :acc_holder_name
      t.string :acc_number
      t.string :email
      t.string :branch

      t.timestamps
    end
  end
end
