import React, { useEffect, useState } from 'react';

import { useAuth } from '../store/AuthContext.jsx';

import { apiRequest } from '../services/api.js';

export default function EmployeeDashboard() {

  const { token, user } = useAuth();

  const [sales, setSales] = useState([]);

  useEffect(() => {

    if (!token) return;
    apiRequest('/sales?page=1&limit=1000', 'GET', undefined, token)
      .then(res => {
        console.log('🔍 DEBUG - Sales API Response:', res);
        console.log('🔍 DEBUG - Sales rows:', res.rows);
        console.log('🔍 DEBUG - Current user:', user);
        setSales(res.rows || []);
      })
      .catch((err) => {
        console.error('❌ DEBUG - Sales API Error:', err);
      });
  }, [token]);

  // Calculate my stats
  console.log('🔍 DEBUG - All sales:', sales);
  console.log('🔍 DEBUG - User name for filtering:', user?.name);
  console.log('🔍 DEBUG - Employee names in sales:', sales.map(s => s.EMPLOYEE_NAME));
  const mySales = sales.filter(sale => sale.EMPLOYEE_NAME === user?.name);
  console.log('🔍 DEBUG - Filtered my sales:', mySales);
  const mySalesCount = mySales.length;
  const myRevenue = mySales.reduce((sum, sale) => sum + (sale.REVENUE || 0), 0);
  console.log('🔍 DEBUG - My sales count:', mySalesCount, 'My revenue:', myRevenue);

  // Calculate leaderboard
  const employeeStats = {};
  sales.forEach(sale => {
    const empName = sale.EMPLOYEE_NAME || 'Unknown';
    if (!employeeStats[empName]) {
      employeeStats[empName] = { name: empName, count: 0, revenue: 0 };
    }
    employeeStats[empName].count++;
    employeeStats[empName].revenue += sale.REVENUE || 0;
  });
  const leaderboard = Object.values(employeeStats).sort((a, b) => b.revenue - a.revenue);

  return (

    <div className="container">
      <h2>Welcome {user?.name}</h2>
      <div className="grid">
        <div className="card"><b>My Sales:</b> {mySalesCount}</div>
        <div className="card"><b>My Revenue:</b> ₹{myRevenue.toLocaleString()}</div>
      </div>
      <div className="card">
        <h3>Leaderboard</h3>
        {leaderboard.length > 0 ? (
        <table>
          <thead><tr><th>Employee</th><th>Sales Count</th><th>Total Revenue</th></tr></thead>
          <tbody>
            {leaderboard.map((emp, idx) => (
              <tr key={idx} style={{fontWeight: emp.name === user?.name ? 'bold' : 'normal'}}>
                <td>{emp.name}</td><td>{emp.count}</td><td>₹{emp.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (<p>No sales data yet</p>)}
      </div>
    </div>
  );

}

