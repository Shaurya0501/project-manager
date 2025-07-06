import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../utils/api';
import './Analytics.css';

const Analytics = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
      setError('');
    } catch (error) {
      setError(error.message || 'Failed to fetch projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysLeft = (dueDate) => {
    if (!dueDate) return 'No due date';
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `${diffDays} day(s) left` : 'Past due';
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="projects-container">
      <h2>Analytics</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="projects-list">
          {projects.map((project) => (
            <li key={project._id}>
              <a href="#!">{project.title}</a>: {calculateDaysLeft(project.dueDate)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Analytics;
