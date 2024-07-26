// pages/LoginPage.tsx
import React, { useEffect, useState } from 'react';
import { useUser } from '../usercontext/usercontext';
import { Navigate } from '../../components/navigate/navigate';
import './loginpage.css';
import { Footer } from '../../components/footer/footer';

export const LoginPage: React.FC = () => {
  const { user } = useUser(); // Access user data from UserContext
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading time

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="login-page">
      <Navigate />
      {user ? (
        <div className="user-info">
          <h2>Welcome Back, {user.name}!</h2>
        </div>
      ) : (
        <p>Please log in to see your information.</p>
      )}
      <Footer/>
    </div>
  );
};
