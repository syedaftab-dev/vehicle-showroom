import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthContext.jsx';
import { apiRequest } from '../services/api.js';
import { 
  Bar, 
  Line, 
  Pie, 
  Doughnut 
} from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  BarElement, 
  LineElement, 
  PointElement, 
  ArcElement,
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend,
  Title
} from 'chart.js';
import { format } from 'date-fns';
import { FaDollarSign, FaCar, FaUsers, FaChartLine, FaSpinner } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  BarElement, 
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend,
  Title
);

export default function BossDashboard() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sales, setSales] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [salesRes, vehiclesRes] = await Promise.all([
          apiRequest('/sales?page=1&limit=1000', 'GET', undefined, token),
          apiRequest('/vehicles?page=1&limit=1000', 'GET', undefined, token)
        ]);
        
        setSales(salesRes.rows || []);
        setVehicles(vehiclesRes.rows || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Calculate stats from fetched data
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.REVENUE || 0), 0);
  const totalSold = vehicles.filter(v => v.STATUS === 'Sold').length;
  const totalAvailable = vehicles.filter(v => v.STATUS === 'Available').length;
  
  // Group sales by employee
  const employeeStats = {};
  sales.forEach(sale => {
    const empName = sale.EMPLOYEE_NAME || 'Unknown';
    if (!employeeStats[empName]) {
      employeeStats[empName] = { name: empName, count: 0, revenue: 0 };
    }
    employeeStats[empName].count++;
    employeeStats[empName].revenue += sale.REVENUE || 0;
  });
  const topPerformers = Object.values(employeeStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Group sales by time period
  const getTimeKey = (date, period) => {
    const d = new Date(date);
    if (period === 'daily') {
      return format(d, 'MMM dd, yyyy');
    } else if (period === 'weekly') {
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      return `Week of ${format(weekStart, 'MMM dd')}`;
    } else {
      return format(d, 'MMM yyyy');
    }
  };

  const timeStats = {};
  sales.forEach(sale => {
    if (sale.SALE_DATE) {
      const key = getTimeKey(sale.SALE_DATE, timeRange);
      if (!timeStats[key]) {
        timeStats[key] = { key, revenue: 0, count: 0 };
      }
      timeStats[key].revenue += sale.REVENUE || 0;
      timeStats[key].count++;
    }
  });
  const timeData = Object.values(timeStats).sort((a, b) => 
    new Date(a.key) - new Date(b.key)
  );

  // Payment method distribution
  const paymentMethods = {};
  sales.forEach(sale => {
    const method = sale.PAYMENT_MODE || 'Unknown';
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });
  
  // Chart data configurations
  const revenueChartData = {
    labels: timeData.map(x => x.key),
    datasets: [{
      label: 'Revenue (₹)', 
      data: timeData.map(x => x.revenue), 
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      tension: 0.3,
      fill: true
    }]
  };

  const paymentChartData = {
    labels: Object.keys(paymentMethods),
    datasets: [{
      data: Object.values(paymentMethods),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ₹${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString()}`} 
          icon={<FaDollarSign className="text-green-500" />}
          trend="+12% from last month"
        />
        <StatCard 
          title="Vehicles Sold" 
          value={totalSold.toLocaleString()}
          icon={<FaCar className="text-blue-500" />}
          trend={`${Math.round((totalSold / (totalSold + totalAvailable)) * 100)}% of inventory`}
        />
        <StatCard 
          title="Available Vehicles" 
          value={totalAvailable.toLocaleString()}
          icon={<FaCar className="text-yellow-500" />}
          trend={`${Math.round((totalAvailable / (totalSold + totalAvailable)) * 100)}% of inventory`}
        />
        <StatCard 
          title="Top Performer" 
          value={topPerformers[0]?.name || 'N/A'}
          icon={<FaUsers className="text-purple-500" />}
          trend={`₹${topPerformers[0]?.revenue.toLocaleString() || '0'} in sales`}
        />
      </div>

      {/* Time Range Selector */}
      <div className="mb-6 flex justify-end space-x-2">
        {['daily', 'weekly', 'monthly'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeRange(period)}
            className={`px-4 py-2 rounded-md ${
              timeRange === period
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Revenue Trend</h3>
          <div className="h-64">
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Methods</h3>
          <div className="h-64">
            <Doughnut 
              data={paymentChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right' },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.length > 0 ? (
              topPerformers.map((emp, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.count} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">₹{emp.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">
                      {Math.round((emp.revenue / totalRevenue) * 100) || 0}% of total
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No sales data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Sales</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sales.slice(0, 5).map((sale, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.SALE_DATE ? format(new Date(sale.SALE_DATE), 'MMM dd, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.VEHICLE_MODEL || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.CUSTOMER_NAME || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.EMPLOYEE_NAME || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sale.PAYMENT_MODE === 'Cash' 
                          ? 'bg-green-100 text-green-800' 
                          : sale.PAYMENT_MODE === 'Finance' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sale.PAYMENT_MODE || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      ₹{(sale.REVENUE || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {sales.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No sales data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{trend}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-100 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

