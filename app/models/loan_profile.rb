# frozen_string_literal: true

class LoanProfile < ApplicationRecord
  belongs_to :customer_info
  belongs_to :partner
  belongs_to :lender, optional: true
  has_many :customer_infos
  has_many :partners
  has_many :lenders

  validates :loan_amount, :amount_offered, :amount_approved, :amount_disbursed, :roi, :processing_fees, numericality: true, allow_nil: true
  validates :mobile, format: {with: /\A\d{10}\z/, message: "must be a valid 10-digit number"}
end
