import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="loading">Loading user info...</div>;
  }

  return (
    <div className="projects-container">
      <h2>Settings</h2>
      <ul className="projects-list user-info">
        <li><strong>Name:</strong> {user.name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        {/* Add more user info as needed */}
      </ul>
    </div>
  );
};

export default Settings;
