import React, { useState } from 'react';
import './adddonation.css';

const AddDonation = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    description: '',
    expiryDateTime: '',
    foodType: '',
    location: '',
    organizationName: '',
    latitude: '',
    longitude: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserLocation = () => {
    setLoadingLocation(true);
    
    // Simulate getting location after a delay
    setTimeout(() => {
      const mockLatitude = 40.7128;
      const mockLongitude = -74.0060;
      const mockAddress = "350 Fifth Avenue, New York, NY 10118";
      
      setFormData((prev) => ({
        ...prev,
        location: mockAddress,
        latitude: mockLatitude,
        longitude: mockLongitude
      }));
      
      setLoadingLocation(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show form data in an alert for demonstration
    alert('Form submitted (frontend only):\n' + JSON.stringify(formData, null, 2));
    
    // Reset form
    setFormData({
      foodName: '',
      quantity: '',
      description: '',
      expiryDateTime: '',
      foodType: '',
      location: '',
      organizationName: '',
      latitude: '',
      longitude: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="donation-form-container">
      <p>
        "Every donation counts – help fight hunger, reduce food waste, and make
        a difference in someone's life today. Your generosity brings hope and
        nourishment to those in need!"
      </p>
      <h2>Add a Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Organization Name:</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            required
            placeholder="Enter your organization name"
          />
        </div>

        <div className="form-group">
          <label>Food Name:</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Food Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Expiry Date & Time:</label>
          <input
            type="datetime-local"
            name="expiryDateTime"
            value={formData.expiryDateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Food Type:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="foodType"
                value="veg"
                checked={formData.foodType === 'veg'}
                onChange={handleInputChange}
                required
              />
              Vegetarian
            </label>
            <label>
              <input
                type="radio"
                name="foodType"
                value="nonveg"
                checked={formData.foodType === 'nonveg'}
                onChange={handleInputChange}
                required
              />
              Non-Vegetarian
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Location:</label>
          <button
            type="button"
            className="location-btn"
            onClick={getUserLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? 'Fetching location...' : 'Get My Location'}
          </button>
          {formData.location && <p className="location-text">{formData.location}</p>}
        </div>

        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default AddDonation;