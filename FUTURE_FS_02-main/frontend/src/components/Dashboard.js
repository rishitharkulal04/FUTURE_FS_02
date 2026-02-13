import React, { useState, useEffect } from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiTrendingUp } from 'react-icons/fi';
import { customerAPI } from '../services/api';
import DonutChart from './Donutchart';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
    
    // Optional: Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchCustomers();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchCustomers = async () => {
    try {
      // ✅ FIXED: Use customerAPI instead of direct fetch
      const data = await customerAPI.getAllCustomers();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  // ✅ FIXED: Changed 'active' to 'Active' to match backend
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;
  
  // Calculate growth rate based on actual data
  const growthRate = totalCustomers > 0 
    ? ((activeCustomers / totalCustomers) * 100).toFixed(1)
    : 0;

  const chartData = [
    { name: 'Active', value: activeCustomers },
    { name: 'Inactive', value: inactiveCustomers },
  ];

  const summaryCards = [
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: <FiUsers />,
      color: '#3b82f6',
      trend: `${totalCustomers} total`,
    },
    {
      title: 'Active Customers',
      value: activeCustomers,
      icon: <FiUserCheck />,
      color: '#10b981',
      trend: `${((activeCustomers / (totalCustomers || 1)) * 100).toFixed(0)}% of total`,
    },
    {
      title: 'Inactive Customers',
      value: inactiveCustomers,
      icon: <FiUserX />,
      color: '#f59e0b',
      trend: `${((inactiveCustomers / (totalCustomers || 1)) * 100).toFixed(0)}% of total`,
    },
    {
      title: 'Active Rate',
      value: `${growthRate}%`,
      icon: <FiTrendingUp />,
      color: '#8b5cf6',
      trend: 'Activity rate',
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="summary-cards">
        {summaryCards.map((card, index) => (
          <div
            className="summary-card"
            key={index}
            style={{ '--card-color': card.color }}
          >
            <div className="card-icon" style={{ backgroundColor: card.color }}>
              {card.icon}
            </div>
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <div className="card-value-row">
                <span className="card-value">{card.value}</span>
                <span className="card-trend">{card.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Customer Distribution</h3>
            <p>Active vs Inactive customers</p>
          </div>
          <DonutChart data={chartData} />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Recent Customers</h3>
            <p>Latest additions</p>
          </div>
          <div className="activity-list">
            {customers.length === 0 ? (
              <div className="no-activity">
                <p>No customers yet. Add your first customer to get started!</p>
              </div>
            ) : (
              customers.slice(0, 5).map((customer, index) => (
                <div className="activity-item" key={customer._id || index}>
                  <div className={`activity-icon ${customer.status.toLowerCase()}`}>
                    {customer.status === 'Active' ? <FiUserCheck /> : <FiUserX />}
                  </div>
                  <div className="activity-details">
                    <p className="activity-title">{customer.name}</p>
                    <p className="activity-time">{customer.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;