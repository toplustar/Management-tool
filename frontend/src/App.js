import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DailyReport from './pages/DailyReport';
import MyInfo from './pages/MyInfo';
import Admin from './pages/Admin';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dailyreport" element={<DailyReport />} />
            <Route path="myinfo" element={<MyInfo />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
