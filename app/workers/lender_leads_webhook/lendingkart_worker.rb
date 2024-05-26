# frozen_string_literal: true

module LenderLeadsWebhook
  class LendingkartWorker
    include Sidekiq::Worker

    sidekiq_options queue: :cron

    STATUSES = ["Application in Progress"].freeze

    def perform(_params={})
      records = LoanProfile.where(lender_name: "CASHE", status: STATUSES)
      records.each do |record|
        Cashe.new.fetch_status(record.external_loan_id)
      end
    end
  end
end
