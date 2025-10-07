import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalHoursThisMonth: 0,
    reportsThisMonth: 0,
    todayReportSubmitted: false,
    todayHours: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const dayName = currentDate.toLocaleString('default', { weekday: 'long' });
  const date = currentDate.getDate();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p className="date-info">{dayName}, {monthName} {date}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-primary">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Today's Hours</h3>
            <div className="stat-value">{stats.todayHours}h</div>
            <div className={`stat-badge ${stats.todayReportSubmitted ? 'badge-success' : 'badge-warning'}`}>
              {stats.todayReportSubmitted ? '✓ Report Submitted' : '⏳ Pending'}
            </div>
          </div>
        </div>

        <div className="stat-card card-secondary">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Monthly Total</h3>
            <div className="stat-value">{stats.totalHoursThisMonth}h</div>
            <div className="stat-label">Total hours in {monthName}</div>
          </div>
        </div>

        <div className="stat-card card-tertiary">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Reports Submitted</h3>
            <div className="stat-value">{stats.reportsThisMonth}</div>
            <div className="stat-label">Reports this month</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="activity-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <a href="/dailyreport" className="action-btn">
              <div className="action-icon">📝</div>
              <div className="action-text">
                <h4>Submit Report</h4>
                <p>Log your daily work</p>
              </div>
            </a>
            <a href="/myinfo" className="action-btn">
              <div className="action-icon">👤</div>
              <div className="action-text">
                <h4>My Profile</h4>
                <p>Update your info</p>
              </div>
            </a>
            {user?.role === 'admin' && (
              <a href="/admin" className="action-btn">
                <div className="action-icon">⚙️</div>
                <div className="action-text">
                  <h4>Admin Panel</h4>
                  <p>Manage users</p>
                </div>
              </a>
            )}
          </div>
        </div>

        <div className="activity-card">
          <h2>Performance Overview</h2>
          <div className="performance-stats">
            <div className="performance-item">
              <div className="performance-label">Average Daily Hours</div>
              <div className="performance-value">
                {stats.reportsThisMonth > 0 
                  ? (stats.totalHoursThisMonth / stats.reportsThisMonth).toFixed(1) 
                  : '0'}h
              </div>
            </div>
            <div className="performance-item">
              <div className="performance-label">Completion Rate</div>
              <div className="performance-value">
                {stats.todayReportSubmitted ? '100%' : '0%'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
