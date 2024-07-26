/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the User object
interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  bio: string;
  email: string;
  name: string;
  token?: string; // Optional if token is not always available
}

// Define the context's shape
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (token) {
        try {
          // Send a request to get user details using the token
          const response = await fetch('http://localhost:5000/api/me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Use the token in the Authorization header
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          setUser(data); // Set the user data
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null); // Clear user data if there's an error
        }
      } else {
        setUser(null); // Clear user data if no token is found
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserContext, UserProvider };
