# frozen_string_literal: true

require "sidekiq"
require "sidekiq/api"

Sidekiq::Cron::Job.create(name: "Messge Worker - Every Hour", cron: "2 * * * *", class: "MessageServiceHourlyWorkerJob", queue: "cron")

Sidekiq::Cron::Job.create(name: "Template Worker -  12 Hourly", cron: "2 */12 * * *", class: "UpdateTemplateWorkerJob", queue: "cron")
