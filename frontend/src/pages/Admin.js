import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import './Admin.css';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
      fetchReports();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/admin/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  if (user?.role !== 'admin') {
    return <div className="card">Access denied. Admin only.</div>;
  }

  return (
    <div className="admin">
      <h1>Admin Panel</h1>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users Management
        </button>
        <button
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          All Reports
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="card">
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge role-${u.role}`}>{u.role}</span>
                  </td>
                  <td>{u.department || '-'}</td>
                  <td>{u.position || '-'}</td>
                  <td>
                    <span className={`status-badge ${u.isActive ? 'active' : 'inactive'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{format(new Date(u.joinDate), 'MMM dd, yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="card">
          <h2>All Daily Reports</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Total Hours</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{format(new Date(report.date), 'MMM dd, yyyy')}</td>
                  <td>{report.user?.firstName} {report.user?.lastName}</td>
                  <td>{report.totalHours}h</td>
                  <td>{report.tasks.length} tasks</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
