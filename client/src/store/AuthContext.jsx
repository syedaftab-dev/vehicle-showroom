import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { apiRequest } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    apiRequest('/auth/me', 'GET', undefined, token)
      .then(u => setUser(u))
      .catch(() => { setUser(null); setToken(''); localStorage.removeItem('token'); })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email, password) => {
    const data = await apiRequest('/auth/login', 'POST', { email, password });
    setToken(data.token);
    localStorage.setItem('token', data.token);
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role, employeeId: data.employeeId });
  };

  const register = async (name, email, password, role) => {
    const data = await apiRequest('/auth/register', 'POST', { name, email, password, role });
    setToken(data.token);
    localStorage.setItem('token', data.token);
    setUser({ id: data.id, name: data.name, email: data.email, role: data.role });
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  const value = useMemo(() => ({ user, token, loading, login, register, logout }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthProvider missing');
  return ctx;
}
