# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_many :user_queries, dependent: :destroy
  validates :email, presence: true, uniqueness: true
  validates :password, length: {minimum: 6}, if: -> { new_record? || !password.nil? }
end
