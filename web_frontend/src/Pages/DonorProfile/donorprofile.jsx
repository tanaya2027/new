import React, { useState } from 'react';
import './donorprofile.css';
import { assets } from '../../assets/assets';

const Donorprofile = () => {
  // Sample user data - in a real app, this would come from your backend
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Springfield, IL',
    joinDate: 'January 15, 2023',
    preferredCauses: ['Homeless Shelters', 'Food Banks', 'Schools'],
    donationHistory: [
      { id: 1, date: '2023-12-15', items: 'Rice, beans, canned goods', recipient: 'Springfield Food Bank', status: 'Delivered' },
      { id: 2, date: '2023-11-20', items: 'Fresh produce, bread', recipient: 'Homeless Shelter', status: 'Delivered' },
      { id: 3, date: '2023-10-05', items: 'Canned soups, pasta', recipient: 'Community Center', status: 'Delivered' },
    ],
    upcomingDonations: [
      { id: 4, date: '2024-03-01', items: 'Non-perishable items', recipient: 'Springfield Elementary', status: 'Scheduled' },
    ]
  });

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/api/placeholder/150/150" alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{userData.name}</h1>
          <p className="profile-tag">Food Donor</p>
          <p className="join-date">Member since {userData.joinDate}</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Contact Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address:</span>
              <span className="info-value">{userData.address}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Preferred Causes</h2>
          <div className="causes-container">
            {userData.preferredCauses.map((cause, index) => (
              <span key={index} className="cause-tag">{cause}</span>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h2>Donation History</h2>
          <div className="donation-history">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Recipient</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.donationHistory.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.date}</td>
                    <td>{donation.items}</td>
                    <td>{donation.recipient}</td>
                    <td>
                      <span className={`status ${donation.status.toLowerCase()}`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="profile-section">
          <h2>Upcoming Donations</h2>
          {userData.upcomingDonations.length > 0 ? (
            <div className="donation-history">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Recipient</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.upcomingDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td>{donation.date}</td>
                      <td>{donation.items}</td>
                      <td>{donation.recipient}</td>
                      <td>
                        <span className={`status ${donation.status.toLowerCase()}`}>
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-donations">No upcoming donations scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donorprofile;