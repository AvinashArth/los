# frozen_string_literal: true

Rails.application.routes.draw do
  # root or home api
  root "pages#index"
  get "up" => "rails/health#show", :as => :rails_health_check

  # user related apis
  post "signup", to: "sessions#create"
  post "login", to: "sessions#login"
  delete "logout", to: "sessions#logout"
  get "user/:id", to: "sessions#fetch_user"
  post "user/query", to: "sessions#user_query"

  # form and location capture screen
  get "onboard", to: "onboard#onboard"
  post "onboard/create", to: "onboard#create"
  post "/upload_image_to_s3", to: "onboard#upload_image_to_s3"

  # customer apis
  scope "/", module: "customers", format: :json do
    get "customer/list", to: "customer#customer_list"
    post "filter/customer/list", to: "customer#filter_list"
    post "update/customer/info", to: "customer#update"

    get "funnel/stats", to: "dashboard#funnel_data"
  end

  get "*path", to: "pages#index", via: :all
end
