# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :mobile
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest
      t.datetime :last_sign_in_at
      t.date :dob
      t.string :otp
      t.string :company_name
      t.string :role
      t.string :role_code
      t.integer :role_id
      t.string :logo
      t.string :selfie_url
      t.string :old_password
      t.text :address
      t.string :city
      t.string :state
      t.string :token
      t.text :permissions

      t.timestamps
    end
  end
end
