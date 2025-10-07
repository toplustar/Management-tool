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

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.firstName}!</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Hours</h3>
          <div className="stat-value">{stats.todayHours}</div>
          <div className="stat-label">
            {stats.todayReportSubmitted ? 'Report Submitted' : 'No Report Yet'}
          </div>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <div className="stat-value">{stats.totalHoursThisMonth}</div>
          <div className="stat-label">Total Hours</div>
        </div>
        <div className="stat-card">
          <h3>Reports</h3>
          <div className="stat-value">{stats.reportsThisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
