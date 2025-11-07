import React, { useEffect, useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';

import { apiRequest, withQuery } from '../services/api.js';

export default function Customers() {

  const { token } = useAuth();

  const [rows, setRows] = useState([]);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', vehicle_of_interest: '', status: 'Pending'
  });

  const [msg, setMsg] = useState('');

  const load = async () => {

    const qs = withQuery('/customers', { page, limit, search });

    const res = await apiRequest(qs, 'GET', undefined, token);

    setRows(res.data);

    setTotal(res.total);

  };

  useEffect(() => { load().catch(()=>{}); }, [page, limit, search, token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await apiRequest('/customers', 'POST', form, token);
      setMsg('Customer added successfully!');
      setForm({ name: '', phone: '', email: '', address: '', vehicle_of_interest: '', status: 'Pending' });
      load().catch(()=>{});
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (

    <div className="container">
      <h2>Customers</h2>
      
      <form className="card" onSubmit={onSubmit}>
        <h3>Add New Customer</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input className="input" placeholder="Vehicle of Interest" value={form.vehicle_of_interest} onChange={e=>setForm({...form, vehicle_of_interest:e.target.value})} />
          <select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
            <option>Pending</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>
        </div>
        <textarea className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} rows={2}></textarea>
        <button className="btn" type="submit">Add Customer</button>
        {msg && <div style={{marginTop:8, color: msg.includes('success') ? 'green' : 'red'}}>{msg}</div>}
      </form>

      <div className="card">
        <input className="input" placeholder="Search name/phone" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className="card">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.ID}><td>{r.ID}</td><td>{r.NAME}</td><td>{r.PHONE}</td><td>{r.STATUS}</td></tr>
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

