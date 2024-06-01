# frozen_string_literal: true

require "sidekiq"
require "sidekiq/web"
require "sidekiq-scheduler"
require "sidekiq-scheduler/web"

Sidekiq.configure_client do |config|
  config.redis = {url: ENV["REDISCLOUD_URL"] || ENV.fetch("REDIS_URL", nil)}
end

Sidekiq.configure_server do |config|
  config.redis = {url: ENV["REDISCLOUD_URL"] || ENV.fetch("REDIS_URL", nil)}
  config.logger = ActiveSupport::Logger.new($stdout)
  config.on(:startup) do
    Sidekiq.schedule = YAML.load_file(Rails.root.join("config", "sidekiq_schedule.yml"))
    Sidekiq::Scheduler.reload_schedule!
  end
end
