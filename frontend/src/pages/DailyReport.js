import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './DailyReport.css';

const DailyReport = () => {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    tasks: [{ description: '', hoursSpent: 0, status: 'in-progress' }],
    notes: ''
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/dailyreport');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleAddTask = () => {
    setFormData({
      ...formData,
      tasks: [...formData.tasks, { description: '', hoursSpent: 0, status: 'in-progress' }]
    });
  };

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...formData.tasks];
    newTasks[index][field] = field === 'hoursSpent' ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, tasks: newTasks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/dailyreport', formData);
      setShowForm(false);
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        tasks: [{ description: '', hoursSpent: 0, status: 'in-progress' }],
        notes: ''
      });
      fetchReports();
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  return (
    <div className="daily-report">
      <div className="page-header">
        <h1>Daily Reports</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'New Report'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Create Daily Report</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <h3>Tasks</h3>
            {formData.tasks.map((task, index) => (
              <div key={index} className="task-group">
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Hours</label>
                    <input
                      type="number"
                      step="0.5"
                      value={task.hoursSpent}
                      onChange={(e) => handleTaskChange(index, 'hoursSpent', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={task.status}
                      onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddTask} className="btn btn-secondary">
              Add Task
            </button>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit Report</button>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Recent Reports</h2>
        {reports.length === 0 ? (
          <p>No reports yet.</p>
        ) : (
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report._id} className="report-item">
                <div className="report-header">
                  <strong>{format(new Date(report.date), 'MMM dd, yyyy')}</strong>
                  <span className="report-hours">{report.totalHours} hours</span>
                </div>
                <div className="report-tasks">
                  {report.tasks.map((task, idx) => (
                    <div key={idx} className="task-item">
                      <span className={`task-status status-${task.status}`}>{task.status}</span>
                      <span>{task.description}</span>
                      <span>{task.hoursSpent}h</span>
                    </div>
                  ))}
                </div>
                {report.notes && <p className="report-notes">{report.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyReport;
