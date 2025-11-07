import React, { useEffect, useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';

import { apiRequest, withQuery } from '../services/api.js';

export default function Employees() {

  const { token, user } = useAuth();

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'Employee', phone: '', address: '', salary: ''
  });

  const [msg, setMsg] = useState('');

  const load = async () => {

    const qs = withQuery('/employees', { page, limit });

    const res = await apiRequest(qs, 'GET', undefined, token);

    setRows(res.data);

    setTotal(res.total);

  };

  useEffect(() => { load().catch(()=>{}); }, [page, limit, token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const payload = {
        ...form,
        salary: parseFloat(form.salary) || 0
      };
      await apiRequest('/employees', 'POST', payload, token);
      setMsg('Employee added successfully!');
      setForm({ name: '', email: '', password: '', role: 'Employee', phone: '', address: '', salary: '' });
      load().catch(()=>{});
    } catch (e) {
      setMsg(e.message);
    }
  };

  const canCreate = user?.role === 'Manager' || user?.role === 'Boss';

  return (

    <div className="container">
      <h2>Employees</h2>
      
      {canCreate && <form className="card" onSubmit={onSubmit}>
        <h3>Add New Employee</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          <select className="input" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option>Employee</option>
            <option>Manager</option>
          </select>
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
          <input className="input" placeholder="Salary" type="number" value={form.salary} onChange={e=>setForm({...form, salary:e.target.value})} />
        </div>
        <textarea className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} rows={2}></textarea>
        <button className="btn" type="submit">Add Employee</button>
        {msg && <div style={{marginTop:8, color: msg.includes('success') ? 'green' : 'red'}}>{msg}</div>}
      </form>}

      <div className="card">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Salary</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.ID}><td>{r.ID}</td><td>{r.NAME}</td><td>{r.EMAIL}</td><td>{r.PHONE}</td><td>{r.SALARY}</td></tr>
            ))}
          </tbody>
        </table>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn" onClick={()=>setPage(Math.max(1,page-1))}>Prev</button>
          <span>Page {page}</span>
          <button className="btn" onClick={()=>setPage(page+1)} disabled={page*limit>=total}>Next</button>
        </div>
      </div>
    </div>
  );

}

