import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Bell, 
  Calendar as CalendarIcon, 
  User, 
  FileText, 
  Layers, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  ArrowRight,
  GraduationCap,
  Shield,
  Leaf,
  ShieldAlert,
  Cpu,
  Sprout,
  Home,
  HeartPulse,
  Briefcase
} from 'lucide-react';
import { pendingPolicies, pendingSchemes, recentActivity } from '../../data/volunteerMockData';
import ProfileDropdown from "../dashboard/ProfileDropdown";
import { ChevronDown } from "lucide-react";

const iconMap = {
  GraduationCap: <GraduationCap size={20} />,
  Shield: <Shield size={20} />,
  Leaf: <Leaf size={20} />,
  ShieldAlert: <ShieldAlert size={20} />,
  Cpu: <Cpu size={20} />,
  Sprout: <Sprout size={20} />,
  Home: <Home size={20} />,
  HeartPulse: <HeartPulse size={20} />,
  Briefcase: <Briefcase size={20} />,
  User: <User size={20} />
};

const VolunteerDashboardMain = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="main-content">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="menu-btn"><Menu size={24} color="var(--text-muted)" /></button>
        </div>
        <div className="header-right">
          <div className="notification-bell">
            <Bell size={24} />
            <div className="notification-dot"></div>
          </div>
          <div className="relative" ref={profileRef}>
            <div className="user-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <div className="avatar">V</div>
              <span style={{fontWeight: 500, fontSize: '14px', color: 'var(--text-main)'}}>Volunteer</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            {isProfileOpen && (
              <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
            )}
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-info">
          <div className="welcome-icon">
            <User size={28} />
          </div>
          <div className="welcome-text">
            <p>Welcome back,</p>
            <h1>Volunteer Reviewer 👋</h1>
            <p className="welcome-sub">Review policies and schemes to help keep information accurate and reliable.</p>
          </div>
        </div>
        <div className="date-card">
          <div className="date-info">
            <p>Today's Date</p>
            <h3>28 May 2025</h3>
          </div>
          <CalendarIcon className="date-icon" size={20} />
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon orange">
              <FileText size={20} />
            </div>
            <div className="stat-value">12</div>
          </div>
          <div className="stat-title">Policies Pending</div>
          <div className="stat-subtitle orange">Requires your review</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <CheckCircle size={20} />
            </div>
            <div className="stat-value">14</div>
          </div>
          <div className="stat-title">Schemes Pending</div>
          <div className="stat-subtitle orange">Requires your review</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <CheckCircle size={20} />
            </div>
            <div className="stat-value">24</div>
          </div>
          <div className="stat-title">Approved</div>
          <div className="stat-subtitle green">This month</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon red">
              <XCircle size={20} />
            </div>
            <div className="stat-value">8</div>
          </div>
          <div className="stat-title">Changes Requested</div>
          <div className="stat-subtitle red">This month</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon purple">
              <Clock size={20} />
            </div>
            <div className="stat-value">36</div>
          </div>
          <div className="stat-title">Total Reviewed</div>
          <div className="stat-subtitle purple">This month</div>
        </div>

        <div className="stat-card" style={{justifyContent: 'center', alignItems: 'center'}}>
          <div className="stat-header" style={{justifyContent: 'center'}}>
            <div className="stat-icon blue">
              <Star size={20} />
            </div>
            <div className="stat-value">4.8</div>
          </div>
          <div className="stat-title" style={{textAlign: 'center'}}>Avg. Review Score</div>
          <div className="stars">
            <Star size={14} fill="var(--warning)" color="var(--warning)" />
            <Star size={14} fill="var(--warning)" color="var(--warning)" />
            <Star size={14} fill="var(--warning)" color="var(--warning)" />
            <Star size={14} fill="var(--warning)" color="var(--warning)" />
            <Star size={14} fill="var(--warning)" color="var(--warning)" style={{opacity: 0.5}}/>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="tables-grid">
        {/* Pending Policies */}
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">
              Pending Policy Reviews <span className="badge badge-orange">12</span>
            </div>
            <a href="#" className="view-all">View all</a>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Department</th>
                <th>Submitted</th>
                <th style={{ textAlign: 'center' }}>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingPolicies.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name-cell">
                      <div className={`item-icon badge-${item.iconColor}`}>
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <div className="item-title">{item.name}</div>
                        <div className="item-subtitle">{item.department}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="item-subtitle">{item.ministry}</span></td>
                  <td><span className="item-subtitle">{item.submitted}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`priority-${item.priority.toLowerCase()}`}>{item.priority}</span>
                  </td>
                  <td><button className="btn-review">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <button className="btn-review" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', backgroundColor: 'var(--primary-light)' }}>
              View All Pending Policy Reviews <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Pending Schemes */}
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">
              Pending Scheme Reviews <span className="badge badge-orange">14</span>
            </div>
            <a href="#" className="view-all">View all</a>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Scheme Name</th>
                <th>Department</th>
                <th>Submitted</th>
                <th style={{ textAlign: 'center' }}>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingSchemes.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name-cell">
                      <div className={`item-icon badge-${item.iconColor}`}>
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <div className="item-title">{item.name}</div>
                        <div className="item-subtitle">{item.department}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="item-subtitle">{item.ministry}</span></td>
                  <td><span className="item-subtitle">{item.submitted}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`priority-${item.priority.toLowerCase()}`}>{item.priority}</span>
                  </td>
                  <td><button className="btn-review">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <button className="btn-review" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', backgroundColor: 'var(--primary-light)' }}>
              View All Pending Scheme Reviews <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="table-card">
        <div className="table-header">
          <div className="table-title">Recent Activity</div>
          <a href="#" className="view-all">View all</a>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Item Type</th>
              <th>Item Name</th>
              <th>Action By</th>
              <th>Time</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((activity) => (
              <tr key={activity.id}>
                <td>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    {activity.action === "Approved" ? (
                      <CheckCircle size={16} color="var(--success)" />
                    ) : (
                      <XCircle size={16} color="var(--danger)" />
                    )}
                    <span style={{fontWeight: 500, color: 'var(--text-main)'}}>{activity.action}</span>
                  </div>
                </td>
                <td>
                  <span className={`type-pill ${activity.itemType.toLowerCase()}`}>
                    {activity.itemType}
                  </span>
                </td>
                <td style={{fontWeight: 500, color: 'var(--text-main)'}}>{activity.itemName}</td>
                <td className="item-subtitle">{activity.actionBy}</td>
                <td className="item-subtitle">{activity.time}</td>
                <td>
                  <span className={`status-pill ${activity.status === "Approved" ? "approved" : "requested"}`}>
                    {activity.status}
                  </span>
                </td>
                <td><span className="action-view">View</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerDashboardMain;
