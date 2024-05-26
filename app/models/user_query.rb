# frozen_string_literal: true

class UserQuery < ApplicationRecord
  belongs_to :user

  validates :email, :number, :message, presence: true
end
