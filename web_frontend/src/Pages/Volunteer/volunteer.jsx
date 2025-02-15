import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './volunteer.css';
import { FaTruck, FaMapMarkerAlt, FaUtensils, FaInfoCircle, FaPhoneAlt, FaEnvelope, FaClipboardList } from 'react-icons/fa';

const Volunteer = () => {
  const [liveOrders, setLiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for testing
  const sampleLiveOrders = [
    {
      _id: "ord123",
      orderNumber: "FD-2025-001",
      createdAt: "2025-02-13T14:30:00.000Z",
      pickupLocation: "Community Kitchen, 123 Main St, Downtown",
      dropLocation: "Senior Center, 456 Oak Ave, Riverside",
      foodName: "Prepared Meals (Chicken & Rice)",
      quantity: 25,
      description: "Freshly prepared meals in individual containers. Need to be delivered by 5 PM today.",
      estimatedDistance: 3.2
    },
    {
      _id: "ord124",
      orderNumber: "FD-2025-002",
      createdAt: "2025-02-14T09:15:00.000Z",
      pickupLocation: "Grocery Partner, 789 Market St, Northside",
      dropLocation: "Family Shelter, 321 Pine St, Eastside",
      foodName: "Fresh Produce Box",
      quantity: 15,
      description: "Boxes containing assorted vegetables and fruits. Refrigeration needed during transport.",
      estimatedDistance: 4.7
    },
    {
      _id: "ord125",
      orderNumber: "FD-2025-003",
      createdAt: "2025-02-14T10:45:00.000Z",
      pickupLocation: "Bakery Donations, 555 Bread Ave, Westside",
      dropLocation: "Youth Center, 777 Park Rd, Southside",
      foodName: "Assorted Baked Goods",
      quantity: 40,
      description: "Various breads, pastries, and muffins. Please deliver within 3 hours to ensure freshness.",
      estimatedDistance: 2.1
    },
    {
      _id: "ord126",
      orderNumber: "FD-2025-004",
      createdAt: "2025-02-14T11:20:00.000Z",
      pickupLocation: "Corporate Cafeteria, 999 Business Blvd, Financial District",
      dropLocation: "Homeless Outreach, 444 Hope St, Downtown",
      foodName: "Sandwich Platters",
      quantity: 10,
      description: "Leftover catering platters from corporate event. Contains various sandwiches, needs to be picked up immediately.",
      estimatedDistance: 1.5
    },
    {
      _id: "ord127",
      orderNumber: "FD-2025-005",
      createdAt: "2025-02-13T16:45:00.000Z",
      pickupLocation: "School Cafeteria, 222 Education Lane, Midtown",
      dropLocation: "Community Center, 888 Unity Circle, Westside",
      foodName: "Meal Packages",
      quantity: 30,
      description: "Packaged meals with sides and desserts. Need temperature-controlled transport.",
      estimatedDistance: 5.3
    }
  ];

  useEffect(() => {
    // Use sample data for frontend demo
    setTimeout(() => {
      setLiveOrders(sampleLiveOrders);
      setLoading(false);
    }, 1000); // Simulate loading for 1 second
  }, []);

  const handleAcceptOrder = (orderId) => {
    // Frontend only: remove the accepted order from the list
    setLiveOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    alert('Order accepted successfully! Please proceed with the delivery.');
  };

  return (
    <div className="volunteer-page">
      <header className="volunteer-header">
        <div className="header-content">
          <h1><FaTruck className="header-icon" /> Volunteer Dashboard</h1>
          <p>Thank you for making a difference in your community!</p>
        </div>
      </header>

      <section className="live-orders-section">
        <h2>Available Orders for Delivery</h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading available orders...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <FaInfoCircle className="error-icon" />
            <p>{error}</p>
          </div>
        ) : liveOrders.length === 0 ? (
          <div className="no-orders-message">
            <p>There are no available orders at the moment.</p>
            <p>Please check back later or contact the admin for more information.</p>
          </div>
        ) : (
          <div className="order-cards-container">
            {liveOrders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order.orderNumber}</span>
                  <span className="order-time">Posted: {new Date(order.createdAt).toLocaleString()}</span>
                </div>
                
                <div className="order-details">
                  <div className="location-detail">
                    <h4><FaMapMarkerAlt className="detail-icon pickup" /> Pickup Location:</h4>
                    <p>{order.pickupLocation}</p>
                  </div>
                  
                  <div className="location-detail">
                    <h4><FaMapMarkerAlt className="detail-icon dropoff" /> Drop Location:</h4>
                    <p>{order.dropLocation}</p>
                  </div>
                  
                  <div className="food-detail">
                    <h4><FaUtensils className="detail-icon" /> Food Item:</h4>
                    <p>{order.foodName}</p>
                    <p className="food-quantity">Quantity: {order.quantity}</p>
                  </div>
                  
                  <div className="additional-info">
                    <h4><FaInfoCircle className="detail-icon" /> Description:</h4>
                    <p>{order.description}</p>
                  </div>
                  
                  {order.estimatedDistance && (
                    <div className="distance-info">
                      <p><span className="distance-badge">{order.estimatedDistance} km</span> estimated distance</p>
                    </div>
                  )}
                </div>
                
                <button 
                  className="accept-order-btn"
                  onClick={() => handleAcceptOrder(order._id)}
                >
                  Accept Delivery Request
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      
      <section className="volunteer-info-section">
        <h2>Important Information</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Delivery Guidelines</h3>
            <ul>
              <li>Verify the food items before picking up</li>
              <li>Ensure proper handling and hygiene</li>
              <li>Confirm recipient identity before handover</li>
              <li>Report any issues immediately through the app</li>
            </ul>
          </div>
          
          <div className="info-card">
            <h3>Contact Support</h3>
            <p>Need help with a delivery?</p>
            <p className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              Phone: (123) 456-7890
            </p>
            <p className="contact-item">
              <FaEnvelope className="contact-icon" />
              Email: support@fooddonation.org
            </p>
          </div>
        </div>
      </section>
      
      <section className="my-deliveries-section">
        <h2>My Active Deliveries</h2>
        <Link to="/my-deliveries" className="view-deliveries-btn">
          <FaClipboardList className="btn-icon" />
          View My Active Deliveries
        </Link>
      </section>
    </div>
  );
};

export default Volunteer;