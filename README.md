# HR Management System

A modern HR management system with dashboard, daily reports, employee information, and admin panel.

## Features

- **Dashboard**: View statistics and overview of work hours
- **Daily Report**: Submit and track daily work reports with tasks
- **My Info**: Manage personal profile information
- **Admin Panel**: Manage users and view all reports (admin only)

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Modern CSS with responsive design

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Setup

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

3. Configure environment variables:
Edit `.env` file with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hr_system
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

4. Start MongoDB (if running locally)

5. Run the application:

Development mode (both backend and frontend):
```bash
npm run dev:full
```

Or run separately:
```bash
# Backend only
npm run dev

# Frontend only (in another terminal)
npm run client
```

## Default Admin Account

To create an admin account, use the register endpoint with role: 'admin':

```bash
POST /api/auth/register
{
  "email": "admin@example.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin"
}
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user

### Dashboard
- GET `/api/dashboard/stats` - Get dashboard statistics

### Daily Reports
- GET `/api/dailyreport` - Get user's reports
- POST `/api/dailyreport` - Create new report
- PUT `/api/dailyreport/:id` - Update report
- DELETE `/api/dailyreport/:id` - Delete report

### My Info
- GET `/api/myinfo` - Get user profile
- PUT `/api/myinfo` - Update user profile

### Admin (Admin only)
- GET `/api/admin/users` - Get all users
- GET `/api/admin/users/:id` - Get user by ID
- PUT `/api/admin/users/:id` - Update user
- DELETE `/api/admin/users/:id` - Delete user
- GET `/api/admin/reports` - Get all reports

## Project Structure

```
HR/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── DailyReport.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── dailyreport.js
│   │   ├── myinfo.js
│   │   └── admin.js
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Layout.js
│       │   └── PrivateRoute.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Dashboard.js
│       │   ├── DailyReport.js
│       │   ├── MyInfo.js
│       │   └── Admin.js
│       ├── App.js
│       └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## License

ISC
