# frozen_string_literal: true

module Customers
  class DashboardController < ApplicationController
    before_action :authorize_request

    def funnel_data
      result = {}
      if current_user.role.downcase == "admin"
        total_data = all_data("admin")
        partner_leads = month_wise_lead("admin")
        loans_stats = loan_stats("admin")
      else
        total_data = all_data(current_user.role_code)
        partner_leads = month_wise_lead(current_user.role_code)
        loans_stats = loan_stats(current_user.role_code)
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
          all_months_data = Hash[Date::MONTHNAMES[1..-1].map { |month| [month, 0] }]
          monthly_data.each { |month, count| all_months_data[Date.parse(month).strftime("%B")] = count }
          partners_data[partner] = {
            labels: all_months_data.keys,
            datasets: all_months_data.values
          }
        end
        partners_data
      else
        monthly_data = query.group_by_month(:created_at, format: "%B %Y").count
        all_months_data = Hash[Date::MONTHNAMES[1..-1].map { |month| [month, 0] }]
        monthly_data.each { |month, count| all_months_data[Date.parse(month).strftime("%B")] = count }
        {
          labels: all_months_data.keys,
          datasets: all_months_data.values
        }
      end
    end    

    def loan_stats(code)
      current_year = Date.current.year
      monthly_data = LoanProfile.where("extract(year from created_at) = ?", current_year)
      monthly_data = monthly_data.where(partner_code: code) unless code.eql?("admin")
      monthly_data = monthly_data.group("DATE_TRUNC('month', created_at)").select(
        "DATE_TRUNC('month', created_at) as month",
        "count(*) as total_leads",
        "sum(case when status = 'disburse' then 1 else 0 end) as disburse_count",
        "sum(case when status = 'disburse' then amount_disbursed else 0 end) as amount_disbursed"
      )
    
      leads_array = monthly_data.map do |data|
        {
          month:            data.month.strftime("%B %Y"),
          total_leads:      data.total_leads,
          disburse_count:   data.disburse_count,
          amount_disbursed: data.amount_disbursed
        }
      end
      leads_array
    end    
  end
end
