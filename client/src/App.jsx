import React from 'react';

import { Routes, Route, Link, Navigate } from 'react-router-dom';

import { useAuth } from './store/AuthContext.jsx';

import Login from './pages/Login.jsx';

import Register from './pages/Register.jsx';

import BossDashboard from './pages/BossDashboard.jsx';

import ManagerDashboard from './pages/ManagerDashboard.jsx';

import EmployeeDashboard from './pages/EmployeeDashboard.jsx';

import Vehicles from './pages/Vehicles.jsx';

import Employees from './pages/Employees.jsx';

import Customers from './pages/Customers.jsx';

import Sales from './pages/Sales.jsx';

import Profile from './pages/Profile.jsx';

function Nav() {
  const { user, logout } = useAuth();
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      {!!user && <>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/customers">Customers</Link>
        {(user.role === 'Manager' || user.role === 'Boss') && <Link to="/employees">Employees</Link>}
        <Link to="/sales">Sales</Link>
        <Link to="/profile">Profile</Link>
        <button className="btn secondary" onClick={logout}>Logout</button>
      </>}
      {!user && <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>}
    </div>
  );
}

function HomeGuard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'Boss') return <BossDashboard />;
  if (user.role === 'Manager') return <ManagerDashboard />;
  return <EmployeeDashboard />;
}

export default function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeGuard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}
