import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { 
  Shield, 
  Menu, 
  Bell, 
  LayoutDashboard, 
  Layers, 
  FileText, 
  Users, 
  Settings, 
  BarChart2, 
  FileBox,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Star,
  FileCheck,
  UserPlus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Data for charts
const chartDataOptions = {
  'thisMonth': [
    { name: '1 Jul', total: 0, approved: 0, pending: 0 },
    { name: '5 Jul', total: 0, approved: 0, pending: 0 },
    { name: '10 Jul', total: 0, approved: 0, pending: 0 },
    { name: '15 Jul', total: 0, approved: 0, pending: 0 },
    { name: '20 Jul', total: 0, approved: 0, pending: 0 },
    { name: '25 Jul', total: 0, approved: 0, pending: 0 },
    { name: '30 Jul', total: 0, approved: 0, pending: 0 },
  ],
  'prevMonth': [
    { name: '1 Jun', total: 0, approved: 0, pending: 0 },
    { name: '5 Jun', total: 0, approved: 0, pending: 0 },
    { name: '10 Jun', total: 0, approved: 0, pending: 0 },
    { name: '15 Jun', total: 0, approved: 0, pending: 0 },
    { name: '20 Jun', total: 0, approved: 0, pending: 0 },
    { name: '25 Jun', total: 0, approved: 0, pending: 0 },
    { name: '30 Jun', total: 0, approved: 0, pending: 0 },
  ],
  'last6Months': [
    { name: 'Feb', total: 0, approved: 0, pending: 0 },
    { name: 'Mar', total: 0, approved: 0, pending: 0 },
    { name: 'Apr', total: 0, approved: 0, pending: 0 },
    { name: 'May', total: 0, approved: 0, pending: 0 },
    { name: 'Jun', total: 0, approved: 0, pending: 0 },
    { name: 'Jul', total: 0, approved: 0, pending: 0 },
  ],
  'last12Months': [
    { name: 'Aug', total: 0, approved: 0, pending: 0 },
    { name: 'Oct', total: 0, approved: 0, pending: 0 },
    { name: 'Dec', total: 0, approved: 0, pending: 0 },
    { name: 'Feb', total: 0, approved: 0, pending: 0 },
    { name: 'Apr', total: 0, approved: 0, pending: 0 },
    { name: 'Jun', total: 0, approved: 0, pending: 0 },
  ]
};

const pieData = [
  { name: 'Agriculture', value: 0, color: '#3b82f6' },
  { name: 'Healthcare', value: 0, color: '#10b981' },
  { name: 'Housing', value: 0, color: '#f97316' },
  { name: 'Education', value: 0, color: '#8b5cf6' },
  { name: 'Others', value: 0, color: '#d1d5db' },
];

export default function App() {
  const [timeRange, setTimeRange] = useState('thisMonth');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const currentChartData = chartDataOptions[timeRange];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const timeRangeLabels = {
    'thisMonth': 'This Month',
    'prevMonth': 'Previous Month',
    'last6Months': 'Last 6 Months',
    'last12Months': 'Last 12 Months'
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Shield className="sidebar-logo-icon" size={24} />
          <span>PolicyGPT</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active" style={{marginBottom: '24px', backgroundColor: '#fff4e5'}}>
            <div className="nav-item-content">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Management</div>
            <div className="nav-item">
              <div className="nav-item-content">
                <Layers size={18} />
                <span>Schedule Management</span>
              </div>
              <ChevronDown size={16} />
            </div>
            <div className="nav-item">
              <div className="nav-item-content">
                <FileText size={18} />
                <span>Policy Management</span>
              </div>
              <ChevronDown size={16} />
            </div>
            <div className="nav-item">
              <div className="nav-item-content">
                <FileBox size={18} />
                <span>Applications</span>
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-item-content">
                <Users size={18} />
                <span>Users</span>
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-item-content">
                <Settings size={18} />
                <span>Roles & Permissions</span>
              </div>
            </div>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Analytics</div>
            <div className="nav-item">
              <div className="nav-item-content">
                <BarChart2 size={18} />
                <span>Analytics</span>
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-item-content">
                <FileText size={18} />
                <span>Reports</span>
              </div>
            </div>
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Content</div>
            <div className="nav-item">
              <div className="nav-item-content">
                <MessageSquare size={18} />
                <span>Notifications</span>
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-item-content">
                <HelpCircle size={18} />
                <span>FAQs</span>
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-item-content">
                <ImageIcon size={18} />
                <span>Banners</span>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <button className="btn-back">
            <ArrowRight size={16} style={{transform: 'rotate(180deg)'}} />
            Back to Main Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <button style={{color: '#6b7280'}}>
            <Menu size={24} />
          </button>
          
          <div className="header-right">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <div className="avatar">A</div>
              <span className="user-name">Admin</span>
              <ChevronDown size={16} color="#6b7280" />
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <p style={{marginBottom: '4px'}}>Welcome back,</p>
            <h1>Admin 👋</h1>
            <p style={{marginTop: '8px'}}>Here's what's happening with your platform today.</p>
          </div>
          <button className="btn-primary">
            View Reports
            <ArrowRight size={16} />
          </button>
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{backgroundColor: '#eef2ff', color: '#4f46e5'}}>
              <FileBox size={20} />
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">Total Schemes</div>
            <div className="stat-trend trend-text">
              <span>0</span>
              <span className="trend-text">this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{backgroundColor: '#d1fae5', color: '#10b981'}}>
              <Shield size={20} />
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">Total Policies</div>
            <div className="stat-trend trend-text">
              <span>0</span>
              <span className="trend-text">this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{backgroundColor: '#ffedd5', color: '#f97316'}}>
              <Users size={20} />
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">Total Users</div>
            <div className="stat-trend trend-text">
              <span>0%</span>
              <span className="trend-text">this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{backgroundColor: '#f3e8ff', color: '#a855f7'}}>
              <FileText size={20} />
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">Applications</div>
            <div className="stat-trend trend-text">
              <span>0%</span>
              <span className="trend-text">this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{backgroundColor: '#e0f2fe', color: '#3b82f6'}}>
              <Bell size={20} />
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">Pending Approvals</div>
            <div className="stat-trend trend-text">
              <span>0</span>
              <span className="trend-text">since yesterday</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{backgroundColor: '#dcfce7', color: '#22c55e'}}>
              <FileCheck size={20} />
            </div>
            <div className="stat-value">0</div>
            <div className="stat-label">Approved Applications</div>
            <div className="stat-trend trend-text">
              <span>0%</span>
              <span className="trend-text">this month</span>
            </div>
          </div>
        </section>

        {/* Management Sections */}
        <section className="management-grid">
          {/* Scheme Management */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Scheme Management</h2>
              <a href="#" className="view-all">View all</a>
            </div>
            <div className="tabs">
              <div className="tab active">All Schemes</div>
              <div className="tab">Pending Review</div>
              <div className="tab">Approved</div>
              <div className="tab">Draft</div>
              <div className="tab">Expired</div>
            </div>
            <div className="list-container">
              <div style={{padding: '24px', textAlign: 'center', color: '#6b7280', fontSize: '14px', backgroundColor: '#fcfaf4', borderRadius: '8px', border: '1px solid #f3f4f6'}}>
                No schemes available
              </div>
            </div>
            <button className="btn-manage">Manage All Schemes <ArrowRight size={16} /></button>
          </div>

          {/* Policy Management */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Policy Management</h2>
              <a href="#" className="view-all">View all</a>
            </div>
            <div className="tabs">
              <div className="tab active" style={{backgroundColor: '#fff4e5'}}>All Policies</div>
              <div className="tab">Published</div>
              <div className="tab">Draft</div>
              <div className="tab">Archived</div>
            </div>
            <div className="list-container">
              <div style={{padding: '24px', textAlign: 'center', color: '#6b7280', fontSize: '14px', backgroundColor: '#fcfaf4', borderRadius: '8px', border: '1px solid #f3f4f6'}}>
                No policies available
              </div>
            </div>
            <button className="btn-manage">Manage All Policies <ArrowRight size={16} /></button>
          </div>
        </section>

        {/* Bottom Grid */}
        <section className="bottom-grid">
          {/* Applications Overview (Line Chart) */}
          <div className="section-card">
            <div className="chart-header">
              <h2 className="section-title">Applications Overview</h2>
              <div style={{position: 'relative'}} ref={dropdownRef}>
                <button 
                  className="dropdown" 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {timeRangeLabels[timeRange]} <ChevronDown size={14} />
                </button>
                
                {isDropdownOpen && (
                  <div className="custom-dropdown-menu">
                    {Object.entries(timeRangeLabels).map(([value, label]) => (
                      <div 
                        key={value}
                        className={`custom-dropdown-item ${timeRange === value ? 'active' : ''}`}
                        onClick={() => {
                          setTimeRange(value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="chart-stats">
              <div className="chart-stat-item">
                <div className="chart-stat-label">
                  <div className="dot dot-total"></div>
                  Total
                </div>
                <div className="chart-stat-value">0</div>
              </div>
              <div className="chart-stat-item">
                <div className="chart-stat-label">
                  <div className="dot dot-approved"></div>
                  Approved
                </div>
                <div className="chart-stat-value">0</div>
              </div>
              <div className="chart-stat-label">
                <div className="chart-stat-label">
                  <div className="dot dot-pending"></div>
                  Pending
                </div>
                <div className="chart-stat-value" style={{fontWeight: 700, fontSize: '18px', color: '#1f2937'}}>0</div>
              </div>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="approved" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="pending" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Applications by Category (Donut Chart) */}
          <div className="section-card">
            <h2 className="section-title" style={{marginBottom: '20px'}}>Applications by Category</h2>
            <div className="donut-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <div className="donut-center-value">0</div>
                <div className="donut-center-label">Total</div>
              </div>
            </div>
            <div className="custom-legend">
              {pieData.map((entry, idx) => (
                <div className="legend-item" key={idx}>
                  <div className="legend-color" style={{backgroundColor: entry.color}}></div>
                  <span>{entry.name} <span style={{fontWeight: 700}}>{entry.value}%</span></span>
                  <span className="legend-count">
                    (0)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Recent Activities</h2>
              <a href="#" className="view-all">View all</a>
            </div>
            <div className="activity-list">
              <div style={{padding: '24px', textAlign: 'center', color: '#6b7280', fontSize: '14px', backgroundColor: '#fcfaf4', borderRadius: '8px', border: '1px solid #f3f4f6'}}>
                No recent activities
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
