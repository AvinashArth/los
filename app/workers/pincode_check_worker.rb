# frozen_string_literal: true

class PincodeCheckWorker
  include Sidekiq::Worker

  sidekiq_options queue: :cron

  def perform(customer_id)
    @user = CustomerInfo.find(customer_id)
    return true if @user.latitude.nil? || @user.longitude.nil?

    lat = @user.latitude.to_f
    lon = @user.longitude.to_f
    nearest_office, distance_from_ro = find_nearest_office(lat, lon)
    is_pincode_approved = distance_from_ro < 30
    @user.update_columns(distance_from_ro: distance_from_ro, is_pincode_approved: is_pincode_approved, ro_office_name: nearest_office)
  end

  def haversine_distance(lat1, lon1, lat2, lon2)
    lat1, lon1, lat2, lon2 = [lat1, lon1, lat2, lon2].map {|coord| coord * Math::PI / 180.0 }
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = (Math.sin(dlat / 2)**2) + (Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dlon / 2)**2))
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    r = 6371.0
    r * c
  end

  def find_nearest_office(lat, lon)
    dict_centers = {
      "Bhiwadi (ABC)":    {lat: 28.211623, lon: 76.8367300},
      "Pataudi (ASK)":    {lat: 28.345064, lon: 76.7612070},
      "Madiyaon (ABC)":   {lat: 26.9318560, lon: 80.9232860},
      "Raebareli (ABC)":  {lat: 26.218144, lon: 81.2547230},
      "Ayodhya (ABC)":    {lat: 26.7564490, lon: 82.1429750},
      "Sultanpur (ASK)":  {lat: 26.2817760, lon: 82.0782870},
      "Unchahar (ASK)":   {lat: 26.5253520, lon: 82.6841470},
      "Bachharwan (ASK)": {lat: 26.4659410, lon: 81.1141840},
      "Gurgaon (RO)":     {lat: 28.4431970, lon: 77.0568660},
      "Lucknow (RO)":     {lat: 26.8649490, lon: 81.0121800},
      "Delhi (ABC)":      {lat: 28.610919057122075, lon: 77.09494888326176}
    }

    min_distance = Float::INFINITY
    nearest_office = nil

    dict_centers.each do |office_name, coords|
      office_lat = coords[:lat]
      office_lon = coords[:lon]
      distance = haversine_distance(lat, lon, office_lat, office_lon)
      if distance < min_distance
        min_distance = distance
        nearest_office = office_name
      end
    end
    [nearest_office, min_distance]
  end
end
