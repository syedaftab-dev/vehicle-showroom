import React, { useEffect, useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';

import { apiRequest, withQuery } from '../services/api.js';

export default function Vehicles() {

  const { token, user } = useAuth();

  const [rows, setRows] = useState([]);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    brand: '', model: '', price: '', fuel_type: 'Petrol', transmission: 'Manual',
    engine_cc: '', mileage: '', features: '', color: '', manufacturing_year: '', status: 'Available'
  });

  const [msg, setMsg] = useState('');

  const load = async () => {

    const qs = withQuery('/vehicles', { page, limit, search });

    const res = await apiRequest(qs, 'GET', undefined, token);

    setRows(res.data);

    setTotal(res.total);

  };

  useEffect(() => { load().catch(()=>{}); }, [page, limit, search, token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        engine_cc: parseFloat(form.engine_cc) || 0,
        mileage: parseFloat(form.mileage) || 0,
        manufacturing_year: parseInt(form.manufacturing_year) || new Date().getFullYear()
      };
      await apiRequest('/vehicles', 'POST', payload, token);
      setMsg('Vehicle added successfully!');
      setForm({
        brand: '', model: '', price: '', fuel_type: 'Petrol', transmission: 'Manual',
        engine_cc: '', mileage: '', features: '', color: '', manufacturing_year: '', status: 'Available'
      });
      load().catch(()=>{});
    } catch (e) {
      setMsg(e.message);
    }
  };

  const canEdit = user?.role === 'Manager' || user?.role === 'Boss';

  return (

    <div className="container">
      <h2>Vehicles</h2>
      
      {canEdit && <form className="card" onSubmit={onSubmit}>
        <h3>Add New Vehicle</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          <input className="input" placeholder="Brand" value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} required />
          <input className="input" placeholder="Model" value={form.model} onChange={e=>setForm({...form, model:e.target.value})} required />
          <input className="input" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
          <select className="input" value={form.fuel_type} onChange={e=>setForm({...form, fuel_type:e.target.value})}>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>
          <select className="input" value={form.transmission} onChange={e=>setForm({...form, transmission:e.target.value})}>
            <option>Manual</option>
            <option>Automatic</option>
            <option>CVT</option>
          </select>
          <input className="input" placeholder="Engine CC" type="number" value={form.engine_cc} onChange={e=>setForm({...form, engine_cc:e.target.value})} />
          <input className="input" placeholder="Mileage (km/l)" type="number" value={form.mileage} onChange={e=>setForm({...form, mileage:e.target.value})} />
          <input className="input" placeholder="Color" value={form.color} onChange={e=>setForm({...form, color:e.target.value})} />
          <input className="input" placeholder="Manufacturing Year" type="number" value={form.manufacturing_year} onChange={e=>setForm({...form, manufacturing_year:e.target.value})} />
          <select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
            <option>Available</option>
            <option>Reserved</option>
            <option>Sold</option>
          </select>
        </div>
        <textarea className="input" placeholder="Features (comma separated)" value={form.features} onChange={e=>setForm({...form, features:e.target.value})} rows={2}></textarea>
        <button className="btn" type="submit">Add Vehicle</button>
        {msg && <div style={{marginTop:8, color: msg.includes('success') ? 'green' : 'red'}}>{msg}</div>}
      </form>}

      <div className="card">
        <input className="input" placeholder="Search brand/model" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className="card">
        <table>
          <thead>
            <tr><th>ID</th><th>Brand</th><th>Model</th><th>Price</th><th>Status</th></tr>
          </thead>
          <tbody>
            {rows.map(v => (
              <tr key={v.ID}><td>{v.ID}</td><td>{v.BRAND}</td><td>{v.MODEL}</td><td>{v.PRICE}</td><td>{v.STATUS}</td></tr>
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

