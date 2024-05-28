import React, { useState, useRef } from 'react';

const LoanApplicationForm = () => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [imageCaptured, setImageCaptured] = useState([false, false]);
  const [capturedPhotoDatas, setCapturedPhotoDatas] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const videoElements = useRef([null, null]);
  const capturedCanvases = useRef([null, null]);

  const handleCaptureImage = (type) => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(mediaStream) {
        videoElements.current[type].srcObject = mediaStream;
        const imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
        imageCapture.takePhoto()
          .then(function(blob) {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              const base64data = reader.result;
              const newCapturedPhotoDatas = [...capturedPhotoDatas];
              newCapturedPhotoDatas[type] = base64data;
              setCapturedPhotoDatas(newCapturedPhotoDatas);
              setImageCaptured(prevState => [...prevState.slice(0, type), true, ...prevState.slice(type + 1)]);
            };
          })
          .catch(function(error) { console.error('Error taking photo:', error); });
      })
      .catch(function(error) { console.error('Error getting user media:', error); });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!lat || !long) {
      alert('Please refresh the page and allow to access location.');
      return;
    }
    if (!imageCaptured[0] || !imageCaptured[1]) {
      alert('Please capture both images before submitting the form.');
      return;
    }
    const formData = new FormData(event.target);
    formData.append('latitude', lat);
    formData.append('longitude', long);
    formData.append('accuracy', accuracy);
    formData.append('partner_code', "TIDE");

    try {
      const response = await fetch(event.target.action, {
        method: event.target.method,
        body: formData
      });
      const data = await response.json();
      const base64Selfie = capturedPhotoDatas[0].split(',')[1];
      const base64ShopPhoto = capturedPhotoDatas[1].split(',')[1];

      const compressedSelfie = await compressImage(base64Selfie);
      const compressedShopPhoto = await compressImage(base64ShopPhoto);

      uploadImageToS3('selfie', compressedSelfie, data.id);
      uploadImageToS3('shop_photo', compressedShopPhoto, data.id);

      setSuccessMessage(data.message);
      setImageCaptured([false, false]);
      setCapturedPhotoDatas([]);
      event.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const uploadImageToS3 = async (imageKey, base64data, id) => {
    try {
      await fetch('/upload_image_to_s3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageKey: imageKey,
          base64data: base64data,
          id: id
        })
      });
    } catch (error) {
      console.error('Error uploading image to S3:', error);
    }
  };

  const compressImage = async (base64Image) => {
    const image = new Image();
    image.src = 'data:image/jpeg;base64,' + base64Image;

    return new Promise((resolve, reject) => {
      image.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, image.width, image.height);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              resolve(reader.result.split(',')[1]);
            };
          },
          'image/jpeg',
          0.7
        );
      };

      image.onerror = function() {
        reject(new Error('Failed to load image'));
      };
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Your form fields and elements */}
        <button type="button" onClick={() => handleCaptureImage(0)}>Capture Selfie</button>
        <button type="button" onClick={() => handleCaptureImage(1)}>Capture Shop Photo</button>
        <input type="submit" value="Submit Details" />
      </form>
      {successMessage && (
        <div className="success-message-overlay">
          <p>{successMessage}</p>
          <a href="/onboard">New</a> |
          <span><a href="/user_login">Login</a></span>
        </div>
      )}
    </div>
  );
};

export default LoanApplicationForm;
