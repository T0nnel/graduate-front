import React from 'react';
import './dashboard.css';
import { useUser } from '../usercontext/usercontext';
import { Navigation } from '../../components/navigation/navigation';
import { Footer } from '../../components/footer/footer';

export const DashboardPage: React.FC = () => {
  const { user } = useUser(); // Use the user context

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }


  return (
    <>
      <Navigation />
      <div className="profile-container">
        <div className="profile-header">
          <img 
            src={user.profilePicture || '/images/icon.png'} 
            alt="Profile Picture" 
            className="profile-picture" 
          />
          <div className="profile-details">
            <h1>{user.name}</h1> 
            <p>{user.email}</p>
            <p>{ `A short bio about ${user.name}`}</p> 
                      </div>
        </div>
        <div className="profile-content">
          <h2>Additional Information</h2>
          <p>{user.bio || 'No additional information provided.'}</p> 
        </div>
      </div>
      <Footer />
    </>
  );
};
