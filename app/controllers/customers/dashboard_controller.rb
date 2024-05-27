# frozen_string_literal: true

module Customers
  class DashboardController < ApplicationController
    before_action :authorize_request

    def funnel_data
      result = []
      if current_user.role.downcase == "admin"
        total_data = all_data("admin")
        partner_leads = month_wise_lead("admin")
        loans_stats = loan_stats("admin")
      else
        total_data = all_data(current_user.role_code)
        partner_leads = month_wise_lead(current_user.role_code)
        loans_stats = loan_stats(current_user.role_code)
      end
      result << total_data
      result << partner_leads
      result << loans_stats
    end

    def all_data(code)
      all_cust = code == "admin" ? CustomerInfo.all.count : CustomerInfo.where(partner_code: code).count
      total_disburse_amount = code == "admin" ? LoanProfile.sum(:amount_disbursed) : LoanProfile.where(partner_code: code).sum(:amount_disbursed)
      total_disburse_lead = code == "admin" ? LoanProfile.where(status: "disbursed").count : LoanProfile.where(status: "disbursed", partner_code: code).count

      [{
        all_cust:              all_cust,
        total_disburse_amount: total_disburse_amount,
        total_disburse_lead:   total_disburse_lead
      }]
    end

    def month_wise_lead(code)
      current_year = Date.current.year
      query = CustomerInfo.where("extract(year from created_at) = ?", current_year)
      query = query.where(partner_code: code) unless code.eql?("admin")

      if code.eql?("admin")
        partners = CustomerInfo.distinct.pluck(:partner_code)
        monthly_leads = {}
        partners.each do |partner|
          monthly_leads[partner] = query.where(partner_code: partner).group_by_month(:created_at, format: "%B %Y").count
        end
      else
        monthly_leads = query.group_by_month(:created_at, format: "%B %Y").count
      end

      monthly_leads.map do |partner, data|
        data.map do |month, count|
          {partner_code: partner, month: month, total: count}
        end
      end.flatten
    end

    def loan_stats(code)
      current_year = Date.current.year
      monthly_data = LoanProfile.where("extract(year from created_at) = ?", current_year)
      monthly_data = monthly_data.where(partner_code: code) unless code.eql?("admin")
                                                                       .group("DATE_TRUNC('month', created_at)")
                                                                       .select(
                                                                         "DATE_TRUNC('month', created_at) as month",
                                                                         "count(*) as total_leads",
                                                                         "sum(case when status = 'disburse' then 1 else 0 end) as disburse_count",
                                                                         "sum(case when status = 'disburse' then disbursed_amount else 0 end) as disbursed_amount"
                                                                       )
      leads_array = monthly_data.map do |data|
        {
          month:            data.month.strftime("%B %Y"),
          total_leads:      data.total_leads,
          disburse_count:   data.disburse_count,
          disbursed_amount: data.disbursed_amount
        }
      end
      total_leads = leads_array.sum {|data| data[:total_leads] }
      total_disburse_count = leads_array.sum {|data| data[:disburse_count] }
      total_disbursed_amount = leads_array.sum {|data| data[:disbursed_amount] }
      leads_array << {
        total_case:             total_leads,
        total_disburse_count:   total_disburse_count,
        total_disbursed_amount: total_disbursed_amount
      }

      leads_array
    end
  end
end
