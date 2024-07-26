import React from 'react';
import './dashboard.css';
import { useUser } from '../usercontext/usercontext';
import { Navigation } from '../../components/navigation/navigation';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const handleEdit = () => {
    navigate('/editprofile');
  };

  const handleAddProduct = () => {
    navigate('/addproduct');
  };

  return (
    <>
      <Navigation />
      <div className="profile-container">
        <div className="profile-header">
          <img 
            src={user.profilePicture || 'https://via.placeholder.com/150'} 
            alt="Profile Picture" 
            className="profile-picture" 
          />
          <div className="profile-details">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.bio || `A short bio about ${user.name}`}</p>
            <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
            <button className="edit-button" onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
        <div className="profile-content">
          <h2>Additional Information</h2>
        </div>
      </div>
    </>
  );
};
