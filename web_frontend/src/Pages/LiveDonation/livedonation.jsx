import React, { useState, useEffect } from 'react';
import './livedonation.css';
import { assets } from '../../assets/assets';
// import ProtectedRoute from '../../Components/ProtectedRoute/protectedroute.jsx';

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const LiveDonations = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [sortedDonations, setSortedDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptingDonation, setAcceptingDonation] = useState(null);

    // Mock data for demonstration
    const mockDonations = [
        {
            _id: '1',
            foodName: 'Fresh Vegetables',
            organizationName: 'Community Garden',
            quantity: '5 kg',
            expiryDateTime: '2025-02-20',
            location: '123 Main St',
            description: 'Assorted fresh vegetables from our community garden',
            imageUrl: '{assets.food2}',
            latitude: 37.7749,
            longitude: -122.4194,
            isAccepted: false
        },
        {
            _id: '2',
            foodName: 'Bread and Pastries',
            organizationName: 'Local Bakery',
            quantity: '10 items',
            expiryDateTime: '2025-02-16',
            location: '456 Oak Ave',
            description: 'Day-old bread and pastries, still fresh',
            imageUrl: 'bread.jpg',
            latitude: 37.7739,
            longitude: -122.4312,
            isAccepted: false
        },
        {
            _id: '3',
            foodName: 'Canned Goods',
            organizationName: 'Food Pantry',
            quantity: '15 cans',
            expiryDateTime: '2025-05-15',
            location: '789 Elm St',
            description: 'Assorted canned vegetables, fruits, and soups',
            imageUrl: 'canned_goods.jpg',
            latitude: 37.7833,
            longitude: -122.4167,
            isAccepted: false
        }
    ];

    const fetchDonations = () => {
        // Return mock data instead of making an API call
        return mockDonations.filter(donation => !donation.isAccepted);
    };

    const handleAccept = (donationId) => {
        if (!window.confirm('Are you sure you want to accept this donation?')) {
            return;
        }

        setAcceptingDonation(donationId);
        
        // Simulate successful acceptance after a short delay
        setTimeout(() => {
            setSortedDonations(prevDonations =>
                prevDonations.filter(donation => donation._id !== donationId)
            );
            alert('Donation accepted successfully!');
            setAcceptingDonation(null);
        }, 1000);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });

                    const donations = fetchDonations();

                    const donationsWithDistance = donations.map(donation => ({
                        ...donation,
                        distance: getDistance(
                            latitude,
                            longitude,
                            donation.latitude,
                            donation.longitude
                        )
                    }));

                    const sorted = donationsWithDistance.sort((a, b) => a.distance - b.distance);
                    setSortedDonations(sorted);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Allow location access to see nearby donations.");
                    setLoading(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    // Function to refresh donations periodically (using mock data)
    useEffect(() => {
        const refreshInterval = setInterval(() => {
            if (userLocation) {
                const donations = fetchDonations();
                const donationsWithDistance = donations.map(donation => ({
                    ...donation,
                    distance: getDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        donation.latitude,
                        donation.longitude
                    )
                }));
                const sorted = donationsWithDistance.sort((a, b) => a.distance - b.distance);
                setSortedDonations(sorted);
            }
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(refreshInterval);
    }, [userLocation]);

    return (
        // <ProtectedRoute allowedRoles={['Donor', 'Recipient', 'Volunteer']}>
            <div className="livedonations">
                <h2>📍 Live Donations Near You</h2>
                {userLocation ? (
                    <p>Your Location: 🌍 {userLocation.latitude.toFixed(3)}, {userLocation.longitude.toFixed(3)}</p>
                ) : (
                    <p>Fetching your location...</p>
                )}

                <div className="donations-container">
                    {loading ? (
                        <p>Loading donations...</p>
                    ) : sortedDonations.length > 0 ? (
                        sortedDonations.map((item) => (
                            <div key={item._id} className="donation-card">
                                <img
                                    src={`/mock-images/${item.imageUrl}`}
                                    alt={item.foodName}
                                    className="donation-image"
                                />
                                <div className="donation-details">
                                    <h3>{item.foodName}</h3>
                                    <p><strong>Posted by:</strong> {item.organizationName}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Expiry:</strong> {item.expiryDateTime}</p>
                                    <p><strong>Location:</strong> {item.location}</p>
                                    <p><strong>Distance:</strong> {item.distance.toFixed(1)} km</p>
                                    <p className="description"><strong>Description:</strong> {item.description}</p>
                                </div>
                                <div className="donation-actions">
                                    <button className="chat-btn">💬 Chat</button>
                                    <button 
                                        className="accept-btn"
                                        onClick={() => handleAccept(item._id)}
                                        disabled={acceptingDonation === item._id}
                                    >
                                        {acceptingDonation === item._id ? 
                                            'Accepting...' : 
                                            '✔ Accept'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-donations">❌ No donations available.</p>
                    )}
                </div>
            </div>
        // </ProtectedRoute>
    );
};

export default LiveDonations;