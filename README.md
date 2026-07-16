# Project Manager - Fullstack Web Application

# Deployment Link-https://project-manager-frontend-qhd8.onrender.com
A modern project management web application built with Node.js, Express.js, MongoDB, and React.js.

## Features

- **User Authentication**: Register, login, and logout functionality
- **Project Management**: Create, view, update, and delete projects
- **Task Management**: Add tasks to projects with status tracking
- **User Roles**: Project owners and team members
- **Progress Tracking**: Visual progress bars for projects
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Modern UI with smooth interactions

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-manager
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/project-manager
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If you're using MongoDB locally:
   ```bash
   mongod
   ```

## Running the Application

### Development Mode

To run both backend and frontend simultaneously:
```bash
npm start
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Running Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Projects
- `GET /api/projects` - Get all projects (protected)
- `GET /api/projects/:id` - Get single project (protected)
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Tasks
- `GET /api/tasks/project/:projectId` - Get tasks for a project (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Project Structure

```
project-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View all your projects on the main dashboard
3. **Create Projects**: Click "Create New Project" to add a new project
4. **Manage Projects**: View project details, update information, or delete projects
5. **Add Tasks**: Create tasks within projects and assign them to team members
6. **Track Progress**: Monitor project and task progress with visual indicators

## Features in Detail

### Authentication
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes for authenticated users
- Automatic token refresh

### Project Management
- Project creation with title, description, and metadata
- Status tracking (planning, in-progress, completed, on-hold)
- Priority levels (low, medium, high, urgent)
- Progress tracking with percentage completion
- Team member assignment

### Task Management
- Task creation within projects
- Status tracking (todo, in-progress, review, completed)
- Priority levels
- Due date assignment
- Time estimation and tracking
- User assignment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on the repository.

## Future Enhancements

- File upload functionality
- Real-time notifications
- Team collaboration features
- Advanced reporting and analytics
- Mobile app development
- Email notifications
- Calendar integration 
