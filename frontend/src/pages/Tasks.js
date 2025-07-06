import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../utils/api';
import './Tasks.css';

const Tasks = () => {
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
    } catch (error) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="projects-container">
      <h2>Tasks</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="projects-list">
          {projects.map((project) => (
            <li key={project._id}>
              <a href="#!">{project.title}</a>
              <div className="task-subtitle">{project.description || 'No description provided'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
