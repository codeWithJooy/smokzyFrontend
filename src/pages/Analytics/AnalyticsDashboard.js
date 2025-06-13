// src/pages/AnalyticsDashboard.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import '../../style/Analytics/Analytics.css';

// Compatible with React 17.0.2
const AnalyticsDashboard = () => {
  // Date Range State
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date()
  });

  // Sample Data
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [42000, 38000, 51000, 47000, 65000, 72000, 58000],
        backgroundColor: '#0fa3b1',
        borderColor: '#0d8c97',
        borderWidth: 2
      }
    ]
  };

  const inventoryData = {
    labels: ['Mint', 'Grape', 'Apple', 'Blueberry', 'Paan'],
    datasets: [
      {
        data: [45, 32, 28, 18, 12],
        backgroundColor: [
          '#0fa3b1',
          '#eddea4',
          '#27ae60',
          '#f39c12',
          '#e74c3c'
        ]
      }
    ]
  };

  // Date Picker Component (Compatible with React 17)
  const DateRangeSelector = () => (
    <div className="date-range-selector">
      <div className="date-picker">
        <label>From:</label>
        <DatePicker
          selected={dateRange.startDate}
          onChange={(date) => setDateRange({...dateRange, startDate: date})}
          selectsStart
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          className="date-input"
        />
      </div>
      <div className="date-picker">
        <label>To:</label>
        <DatePicker
          selected={dateRange.endDate}
          onChange={(date) => setDateRange({...dateRange, endDate: date})}
          selectsEnd
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          minDate={dateRange.startDate}
          className="date-input"
        />
      </div>
    </div>
  );

  return (
    <div className="analytics-dashboard">
      <h2>Analytics Dashboard</h2>
      
      {/* Filters Section */}
      <div className="filters-section">
        <DateRangeSelector />
        
        <div className="quick-ranges">
          <button onClick={() => setDateRange({
            startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
            endDate: new Date()
          })}>Last 7 Days</button>
          
          <button onClick={() => setDateRange({
            startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
            endDate: new Date()
          })}>Last 30 Days</button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="metrics-overview">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <p>₹2,45,800 <span className="positive">↑18%</span></p>
        </div>
        <div className="metric-card">
          <h3>Orders Completed</h3>
          <p>142 <span className="positive">↑12%</span></p>
        </div>
        <div className="metric-card">
          <h3>Avg. Order Value</h3>
          <p>₹1,730 <span className="negative">↓3%</span></p>
        </div>
        <div className="metric-card">
          <h3>Inventory Health</h3>
          <p>82% <span className="neutral">→</span></p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Revenue Trend</h3>
          <Line
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                }
              }
            }}
          />
        </div>
        
        <div className="chart-container">
          <h3>Inventory Levels</h3>
          <Pie
            data={inventoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;