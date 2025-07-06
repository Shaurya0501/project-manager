import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, tasksAPI } from '../utils/api';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startInEditMode = queryParams.get('edit') === 'true';

  const [isEditing, setIsEditing] = useState(startInEditMode);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    startDate: '',
    endDate: '',
    progress: 0
  });

  const fetchProjectDetails = useCallback(async () => {
    try {
      setLoading(true);
      const [projectResponse, tasksResponse] = await Promise.all([
        projectsAPI.getById(projectId),
        tasksAPI.getByProject(projectId)
      ]);
      
      setProject(projectResponse.data);
      setTasks(tasksResponse.data);
      setEditForm({
        title: projectResponse.data.title,
        description: projectResponse.data.description,
        status: projectResponse.data.status,
        priority: projectResponse.data.priority,
        startDate: projectResponse.data.startDate ? new Date(projectResponse.data.startDate).toISOString().split('T')[0] : '',
        endDate: projectResponse.data.endDate ? new Date(projectResponse.data.endDate).toISOString().split('T')[0] : '',
        progress: projectResponse.data.progress
      });
    } catch (error) {
      setError('Failed to fetch project details');
      console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await projectsAPI.update(projectId, editForm);
      setProject(response.data);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update project');
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await projectsAPI.delete(projectId);
        navigate('/dashboard');
      } catch (error) {
        setError('Failed to delete project');
        console.error('Error deleting project:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'in-progress':
        return '#007bff';
      case 'planning':
        return '#ffc107';
      case 'on-hold':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return '#dc3545';
      case 'high':
        return '#fd7e14';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'review':
        return '#17a2b8';
      case 'in-progress':
        return '#007bff';
      case 'todo':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="project-details-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-details-container">
        <div className="error-message">{error}</div>
        <Link to="/dashboard" className="back-btn">Back to Dashboard</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details-container">
        <div className="error-message">Project not found</div>
        <Link to="/dashboard" className="back-btn">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="project-details-container">
      <header className="project-details-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/dashboard" className="back-btn">← Back to Dashboard</Link>
            <h1>{isEditing ? 'Edit Project' : project.title}</h1>
          </div>
          <div className="header-actions">
            {!isEditing && (
              <>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="edit-btn"
                >
                  Edit Project
                </button>
                <button 
                  onClick={handleDeleteProject} 
                  className="delete-btn"
                >
                  Delete Project
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="project-details-main">
        {isEditing ? (
          <div className="edit-project-container">
            <div className="edit-project-card">
              <div className="card-header">
                <h2>Edit Project</h2>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="back-btn"
                >
                  ← Back to Project
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Project Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter project title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter project description"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={editForm.status}
                      onChange={handleChange}
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                      id="priority"
                      name="priority"
                      value={editForm.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={editForm.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={editForm.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="progress">Progress (%)</label>
                  <input
                    type="number"
                    id="progress"
                    name="progress"
                    value={editForm.progress}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="Enter progress percentage"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-btn"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="project-overview">
              <div className="project-info">
                <div className="project-header">
                  <h2>{project.title}</h2>
                  <div className="project-badges">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    >
                      {project.status}
                    </span>
                    <span
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(project.priority) }}
                    >
                      {project.priority}
                    </span>
                  </div>
                </div>
                
                <p className="project-description">
                  {project.description || 'No description provided'}
                </p>
                
                <div className="project-progress">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">Owner:</span>
                  <span className="meta-value">{project.owner?.name}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Created:</span>
                  <span className="meta-value">{formatDate(project.createdAt)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Start Date:</span>
                  <span className="meta-value">{formatDate(project.startDate)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">End Date:</span>
                  <span className="meta-value">{formatDate(project.endDate)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Last Updated:</span>
                  <span className="meta-value">{formatDate(project.updatedAt)}</span>
                </div>
              </div>
            </div>

            <div className="project-tasks">
              <div className="tasks-header">
                <h3>Tasks ({tasks.length})</h3>
                <Link to={`/projects/${projectId}/tasks/new`} className="add-task-btn">
                  + Add Task
                </Link>
              </div>
              
              {tasks.length === 0 ? (
                <div className="no-tasks">
                  <p>No tasks created yet.</p>
                  <Link to={`/projects/${projectId}/tasks/new`} className="create-first-task-btn">
                    Create First Task
                  </Link>
                </div>
              ) : (
                <div className="tasks-list">
                  {tasks.map((task) => (
                    <div key={task._id} className="task-item">
                      <div className="task-header">
                        <h4>{task.title}</h4>
                        <div className="task-badges">
                          <span
                            className="task-status-badge"
                            style={{ backgroundColor: getTaskStatusColor(task.status) }}
                          >
                            {task.status}
                          </span>
                          <span
                            className="task-priority-badge"
                            style={{ backgroundColor: getPriorityColor(task.priority) }}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      
                      <p className="task-description">
                        {task.description || 'No description provided'}
                      </p>
                      
                      <div className="task-meta">
                        <div className="task-assignee">
                          <span>Assigned to:</span>
                          <span>{task.assignedTo?.name || 'Unassigned'}</span>
                        </div>
                        <div className="task-due-date">
                          <span>Due:</span>
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                        {task.estimatedHours && (
                          <div className="task-hours">
                            <span>Estimated:</span>
                            <span>{task.estimatedHours}h</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProjectDetails; 