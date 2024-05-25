# frozen_string_literal: true

class Partner < ApplicationRecord
  validates :name, presence: true
  validates :code, presence: true, uniqueness: true

  has_many :loan_profiles
  has_many :customer_infos
end
