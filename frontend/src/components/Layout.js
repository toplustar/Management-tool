import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>HR System</h2>
        </div>
        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/dailyreport" className="nav-link">Daily Report</Link>
          <Link to="/myinfo" className="nav-link">My Info</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
        </div>
        <div className="navbar-user">
          <span>{user?.firstName} {user?.lastName}</span>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
