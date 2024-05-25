# frozen_string_literal: true

class CreatePartners < ActiveRecord::Migration[7.1]
  def change
    create_table :partners do |t|
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
      t.string :branch
      t.timestamps
    end
  end
end
