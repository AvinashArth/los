# frozen_string_literal: true

# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:

require File.expand_path("#{File.dirname(__FILE__)}/environment")

set :output, "job.log"

every "2 * * * *" do
  # rake 'message_service:execute_method', :environment => Rails.env unless Rails.env.production?
end

every 15.minute do
  # rake 'template_service:execute_method', :environment => Rails.env unless Rails.env.production?
end
# Learn more: http://github.com/javan/whenever
