/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6
import './register.css'; // Ensure the path to your CSS file is correct

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading status

  const { firstName, lastName, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      // Registration successful, navigate to login page
      navigate('/login');
    } catch (err: any) {
      setError(err.message); // Set error message
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='full1'>
      <div className='text1'>
        <h2>Register</h2>
        <div className='whole'>
          <form className='form1' onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={onChange}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
              className='email'
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength={6}
              required
              className='password'
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <p className="error">{error}</p>} {/* Display error message */}
          </form>
        </div>
      </div>
    </div>
  );
};
