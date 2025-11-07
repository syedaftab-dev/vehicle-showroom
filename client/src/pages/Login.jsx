import React, { useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="card" style={{color:'red'}}>{error}</div>}
      <form onSubmit={onSubmit} className="card">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
