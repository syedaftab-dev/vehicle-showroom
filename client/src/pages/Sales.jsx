import React, { useEffect, useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';

import { apiRequest, withQuery } from '../services/api.js';

export default function Sales() {

  const { token, user } = useAuth();

  const [rows, setRows] = useState([]);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [form, setForm] = useState({ vehicle_id:'', employee_id:'', customer_id:'', payment_mode:'Cash', revenue:'' });

  const [msg, setMsg] = useState('');

  const load = async () => {

    const qs = withQuery('/sales', { page, limit });

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
        employee_id: form.employee_id || user?.employeeId,
        revenue: parseFloat(form.revenue) || 0
      };

      await apiRequest('/sales', 'POST', payload, token);

      setMsg('Sale recorded');

      setForm({ vehicle_id:'', employee_id:'', customer_id:'', payment_mode:'Cash', revenue:'' });

      load().catch(()=>{});

    } catch (e) {

      setMsg(e.message);

    }

  };

  const canCreate = user?.role === 'Manager' || user?.role === 'Boss';

  return (

    <div className="container">
      <h2>Sales</h2>
      {canCreate && <form className="card" onSubmit={onSubmit}>
        <input className="input" placeholder="Vehicle ID" value={form.vehicle_id} onChange={e=>setForm({...form, vehicle_id:e.target.value})} />
        <input className="input" placeholder="Customer ID" value={form.customer_id} onChange={e=>setForm({...form, customer_id:e.target.value})} />
        <input className="input" placeholder="Employee ID (optional)" value={form.employee_id} onChange={e=>setForm({...form, employee_id:e.target.value})} />
        <select className="input" value={form.payment_mode} onChange={e=>setForm({...form, payment_mode:e.target.value})}>
          <option>Cash</option>
          <option>Finance</option>
          <option>Card</option>
          <option>Loan</option>
        </select>
        <input className="input" placeholder="Revenue" value={form.revenue} onChange={e=>setForm({...form, revenue:e.target.value})} />
        <button className="btn" type="submit">Record Sale</button>
        {msg && <div style={{marginTop:8}}>{msg}</div>}
      </form>}
      <div className="card">
        <table>
          <thead><tr><th>ID</th><th>Date</th><th>Brand</th><th>Model</th><th>Emp</th><th>Customer</th><th>Mode</th><th>Revenue</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.ID}><td>{r.ID}</td><td>{new Date(r.SALE_DATE).toLocaleDateString()}</td><td>{r.BRAND}</td><td>{r.MODEL}</td><td>{r.EMPLOYEE_NAME}</td><td>{r.CUSTOMER_NAME}</td><td>{r.PAYMENT_MODE}</td><td>{r.REVENUE}</td></tr>
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

