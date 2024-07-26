import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './editprofile.css';

export const EditProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    password: ''
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('email', profile.email);
    formData.append('bio', profile.bio);
    if (profile.password) {
      formData.append('password', profile.password);
    }
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/updateProfile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Profile updated:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-edit-title">Update Profile</h2>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Profile Picture:
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="form-input"
              onChange={handlePictureChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            First Name:
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              className="form-input"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              className="form-input"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              className="form-input"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Bio:
            <textarea
              name="bio"
              value={profile.bio}
              className="form-textarea"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            New Password:
            <input
              type="password"
              name="password"
              value={profile.password}
              className="form-input"
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="profile-edit-submit">Update Profile</button>
      </form>
    </div>
  );
};
