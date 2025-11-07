import React, { useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';

export default function Register() {

  const { register } = useAuth();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [role, setRole] = useState('Employee');

  const [error, setError] = useState('');

  const onSubmit = async (e) => {

    e.preventDefault();

    setError('');

    try {

      await register(name, email, password, role);

    } catch (e) {

      setError(e.message);

    }

  };

  return (

    <div className="container">
      <h2>Register</h2>
      {error && <div className="card" style={{color:'red'}}>{error}</div>}
      <form onSubmit={onSubmit} className="card">
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
          <option>Employee</option>
          <option>Manager</option>
          <option>Boss</option>
        </select>
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );

}

