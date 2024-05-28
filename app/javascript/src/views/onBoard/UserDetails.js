import React, { useState, useEffect } from 'react';
import "./userDetails.css";
const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Assuming you have a function to fetch customer data
        const customerData = await fetchCustomer(); // Implement fetchCustomer function
        setCustomer(customerData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!latitude || !longitude) {
      alert('Please refresh the page and allow access to location.');
      return;
    }

    const formData = new FormData(event.target);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    try {
      const response = await fetch(event.target.action, {
        method: event.target.method,
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again.');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        alert('Please refresh the page and allow access to location.');
        console.error('Error getting location:', error);
      }
    );
  };

  return (
    <div>
      <div className="top_nav">
        <img src="Happy-Tide.png" alt="logo" className="logo" />
        <label className="animation user-label">Hello..</label>
      </div>
      {customer ? (
        <div>
          <h1>Consent</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <input type="hidden" name="mobile" value={customer.mobile} />
            <input type="hidden" name="latitude" value={latitude} />
            <input type="hidden" name="longitude" value={longitude} />
            <div className="form-group">
              <label className="required">First Name</label>
              <input type="text" name="first_name" required className="form-control" defaultValue={customer.first_name} />
            </div>
            <div className="form-group">
              <label className="required">Last Name</label>
              <input type="text" name="last_name" required className="form-control" defaultValue={customer.last_name} />
            </div>
            <div className="form-group">
              <label className="required">Mobile (10 digits)</label>
              <input type="text" name="mobile" required pattern="\d{10}" className="form-control" readOnly defaultValue={customer.mobile} />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : (
        <div id="not-found-message" style={{ textAlign: 'center', marginTop: '20vh', fontWeight: 'bold', fontSize: '2em' }}>
          <p>Customer data not present. Please click on the below button to apply for a loan.</p>
          <div id="success-message-text">
            <a href="/onboard" id="onboardNewButton">Apply Loan</a>
          </div>
        </div>
      )}
      <div id="success-message" style={{ textAlign: 'center', marginTop: '20vh', fontWeight: 'bold', fontSize: '2em' }}>
        <p>{successMessage}</p>
      </div>
    </div>
  );
};

export default CustomerDetails;
