import React from 'react';

import { useAuth } from '../store/AuthContext.jsx';

export default function Profile() {

  const { user } = useAuth();

  if (!user) return <div className="container"><div className="card">Not logged in</div></div>;

  return (

    <div className="container">
      <h2>Profile</h2>
      <div className="card">
        <div><b>Name:</b> {user.name}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Role:</b> {user.role}</div>
        <div><b>Employee ID:</b> {user.employeeId || '-'}</div>
      </div>
    </div>
  );

}

