# frozen_string_literal: true

class CustomerInfo < ApplicationRecord
  belongs_to :partner, optional: true
  belongs_to :lender, optional: true
  has_many :partners
  has_many :loan_profiles
  after_commit :pincode_check

  validates :mobile, format: {with: /\A\d{10}\z/, message: "must be a valid 10-digit number"}

  def pincode_check
    ::PincodeCheckWorker.perform_async(id)
  rescue StandardError => e
    Rails.logger.error("Error in PincodeCheck.perform: #{e.message}")
  end

  private

  def upcase_status
    self.status = status.upcase if status.present?
  end
end
