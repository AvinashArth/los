# frozen_string_literal: true

class CreateUserQuery < ActiveRecord::Migration[7.1]
  def change
    create_table :user_queries do |t|
      t.references :user, null: false, foreign_key: true
      t.string :email
      t.string :role
      t.string :number
      t.text :message
      t.string :address
      t.string :website
      t.string :company_name

      t.timestamps
    end
  end
end
