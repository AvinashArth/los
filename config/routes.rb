# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  post "signup", to: "sessions#create"
  post "login", to: "sessions#login"
  delete "logout", to: "sessions#logout"

  # form and location capture screen
  get "onboard", to: "onboard#onboard"
  post "onboard/create", to: "onboard#create"
  post "/upload_image_to_s3", to: "onboard#upload_image_to_s3"

  get '*path', to: 'pages#index', via: :all

  # Defines the root path route ("/")
  # root "posts#index"
end
