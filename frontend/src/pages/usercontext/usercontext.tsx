import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types/types'; // Import the User type

// Define the context's shape
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void; // Method to update user details
  logout: () => void; // Method to handle user logout
  error: string | null; // Error state for user operations
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data: User = await response.json();
          setUser(data); // Set the user data
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('An error occurred while fetching user data');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async (userData: Partial<User>) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/updateProfile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Use application/json for JSON data
        },
        body: JSON.stringify(userData), // Send the data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser); // Update the user data
      setError(null); // Clear error
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('An error occurred while updating user data');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logout, error }}>
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
