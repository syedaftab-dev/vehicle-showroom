import React, { useEffect, useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';

import { apiRequest } from '../services/api.js';

export default function ManagerDashboard() {

  const { token } = useAuth();

  const [sales, setSales] = useState([]);

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {

    apiRequest('/sales?page=1&limit=1000', 'GET', undefined, token)
      .then(res => setSales(res.rows || []))
      .catch(()=>{});
    apiRequest('/vehicles?page=1&limit=1000', 'GET', undefined, token)
      .then(res => setVehicles(res.rows || []))
      .catch(()=>{});
  }, [token]);

  // Calculate employee stats
  const employeeStats = {};
  sales.forEach(sale => {
    const empName = sale.EMPLOYEE_NAME || 'Unknown';
    if (!employeeStats[empName]) {
      employeeStats[empName] = { name: empName, count: 0, revenue: 0 };
    }
    employeeStats[empName].count++;
    employeeStats[empName].revenue += sale.REVENUE || 0;
  });
  const byEmp = Object.values(employeeStats).sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.REVENUE || 0), 0);
  const totalSold = vehicles.filter(v => v.STATUS === 'Sold').length;

  return (

    <div className="container">
      <h2>Manager Dashboard</h2>
      <div className="grid">
        <div className="card"><b>Total Revenue:</b> ₹{totalRevenue.toLocaleString()}</div>
        <div className="card"><b>Total Vehicles Sold:</b> {totalSold}</div>
      </div>
      <div className="card">
        <h3>Team Performance</h3>
        {byEmp.length > 0 ? (
        <table>
          <thead><tr><th>Employee</th><th>Sales Count</th><th>Total Revenue</th></tr></thead>
          <tbody>
            {byEmp.map((emp, idx) => (
              <tr key={idx}><td>{emp.name}</td><td>{emp.count}</td><td>₹{emp.revenue.toLocaleString()}</td></tr>
            ))}
          </tbody>
        </table>
        ) : (<p>No sales data yet</p>)}
      </div>
    </div>
  );

}

