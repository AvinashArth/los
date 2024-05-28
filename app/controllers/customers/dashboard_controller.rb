# frozen_string_literal: true

module Customers
  class DashboardController < ApplicationController
    before_action :authorize_request

    def funnel_data
      result = {}
      if current_user.role.downcase == "admin"
        total_data = all_data("admin")
        partner_leads = month_wise_lead("admin")
        loan_stats("admin")
      else
        total_data = all_data(current_user.role_code)
        partner_leads = month_wise_lead(current_user.role_code)
        loan_stats(current_user.role_code)
      end
      result.merge!(total_data)
      result.merge!(partner_leads)
      # result.merge!(loans_stats)
      render json: result
    end

    def all_data(code)
      all_cust = code == "admin" ? CustomerInfo.all.count : CustomerInfo.where(partner_code: code).count
      total_disburse_amount = code == "admin" ? LoanProfile.sum(:amount_disbursed) : LoanProfile.where(partner_code: code).sum(:amount_disbursed)
      total_disburse_lead = code == "admin" ? LoanProfile.where(status: "disbursed").count : LoanProfile.where(status: "disbursed", partner_code: code).count

      {
        all_cust:              all_cust,
        total_disburse_amount: total_disburse_amount,
        total_disburse_lead:   total_disburse_lead
      }
    end

    def month_wise_lead(code)
      current_year = Date.current.year
      query = CustomerInfo.where("extract(year from created_at) = ?", current_year)
      query = query.where(partner_code: code) unless code.eql?("admin")

      if code.eql?("admin")
        partners_data = {}
        partners = CustomerInfo.distinct.pluck(:partner_code)
        partners.each do |partner|
          monthly_data = query.where(partner_code: partner)
                              .group_by_month(:created_at, format: "%B %Y")
                              .count
          all_months_data = Date::MONTHNAMES[1..].to_h {|month| [month, 0] }
          monthly_data.each {|month, count| all_months_data[Date.parse(month).strftime("%B")] = count }
          partners_data[partner] = {
            labels:   all_months_data.keys,
            datasets: all_months_data.values
          }
        end
        partners_data
      else
        monthly_data = query.group_by_month(:created_at, format: "%B %Y").count
        all_months_data = Date::MONTHNAMES[1..].to_h {|month| [month, 0] }
        monthly_data.each {|month, count| all_months_data[Date.parse(month).strftime("%B")] = count }
        {
          labels:   all_months_data.keys,
          datasets: all_months_data.values
        }
      end
    end

    def fetch_funnel_data(_code)
      partners = if current_user.role == "admin"
                   Partner.pluck(:code)
                 else
                   [current_user.code]
                 end
      lenders = Lender.pluck(:name)

      data = {}
      partners.each do |partner|
        partner_data = {}
        partner_data[:total] = LoanProfile.where(partner_name: partner, created_at: 1.month.ago.beginning_of_day..1.month.ago.end_of_day).count

        lender_data = {}
        lenders.each do |lender|
          lender_data[lender] = {
            total_sent: LoanProfile.where(partner_name: partner, lender_name: lender, created_at: 1.month.ago.beginning_of_day..1.month.ago.end_of_day).count,
            approved:   LoanProfile.where(partner_name: partner, lender_name: lender, status: "APPROVED", created_at: 1.month.ago.beginning_of_day..1.month.ago.end_of_day).count,
            disbursed:  LoanProfile.where(partner_name: partner, lender_name: lender, status: "DISBURSED", created_at: 1.month.ago.beginning_of_day..1.month.ago.end_of_day).count,
            rejected:   LoanProfile.where(partner_name: partner, lender_name: lender, status: "REJECTED", created_at: 1.month.ago.beginning_of_day..1.month.ago.end_of_day).count
          }
        end

        partner_data[:lenders] = lender_data
        data[partner] = partner_data
      end

      data
    end
  end
end
