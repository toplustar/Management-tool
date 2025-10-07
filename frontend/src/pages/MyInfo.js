import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './MyInfo.css';

const MyInfo = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    department: '',
    position: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('/api/myinfo');
      setUser(response.data);
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone || '',
        department: response.data.department || '',
        position: response.data.position || ''
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/myinfo', formData);
      setMessage('Profile updated successfully');
      setIsEditing(false);
      fetchUserInfo();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myinfo">
      <h1>My Information</h1>

      <div className="card">
        <div className="info-header">
          <h2>Profile Details</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-primary"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {message && <div className="success">{message}</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        ) : (
          <div className="info-display">
            <div className="info-item">
              <label>Name</label>
              <p>{user.firstName} {user.lastName}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-item">
              <label>Phone</label>
              <p>{user.phone || 'Not provided'}</p>
            </div>
            <div className="info-item">
              <label>Department</label>
              <p>{user.department || 'Not assigned'}</p>
            </div>
            <div className="info-item">
              <label>Position</label>
              <p>{user.position || 'Not assigned'}</p>
            </div>
            <div className="info-item">
              <label>Role</label>
              <p className="role-badge">{user.role}</p>
            </div>
            <div className="info-item">
              <label>Join Date</label>
              <p>{format(new Date(user.joinDate), 'MMM dd, yyyy')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
