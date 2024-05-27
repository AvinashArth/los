import React, { useState, useEffect } from 'react';
import "./userDetails.css"
const CustomerForm = ({ customer }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    // Fetch user's geolocation
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      (err) => {
        console.error('ERROR(' + err.code + '): ' + err.message);
      }
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!latitude || !longitude) {
      alert('Please allow access to your location to capture latitude and longitude.');
      return;
    }

    // Form submission logic
    const formData = new FormData(event.target);
    try {
      const response = await fetch('/save_location', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="formContainerStyle">
      <h1>Consent</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="latitude" value={latitude} />
        <input type="hidden" name="longitude" value={longitude} />
        <div className="formgroup">
          <label htmlFor="first_name" className="required">First Name</label>
          <input type="text" name="first_name" required className="form-control" defaultValue={customer.first_name} />
        </div>
        <div className="formgroup">
          <label htmlFor="last_name" className="required">Last Name</label>
          <input type="text" name="last_name" required className="form-control" defaultValue={customer.last_name} />
        </div>
        <div className="formgroup">
          <label htmlFor="mobile" className="required">Mobile (10 digits)</label>
          <input type="text" name="mobile" required pattern="\d{10}" className="form-control" readOnly defaultValue={customer.mobile} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


export default CustomerForm;
