import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  CheckCircle, 
  MessageSquare, 
  UserCheck, 
  History,
  BookOpen,
  HelpCircle,
  Bell,
  ArrowLeft,
  LayoutGrid
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoFull from '../../assets/logos/logo-full.svg';

const VolunteerSidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container mb-8">
        <Link to="/" className="shrink-0 transition-transform duration-200 hover:scale-105">
          <img src={logoFull} alt="PolicyGPT" className="h-9 w-auto" />
        </Link>
      </div>

      <div className="menu-group">
        <div className="menu-item active">
          <div className="menu-item-left">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </div>
        </div>
      </div>

      <div className="menu-group">
        <div className="menu-title">REVIEW</div>
        <Link to="/policies" className="menu-item" style={{display: 'flex'}}>
          <div className="menu-item-left">
            <FileText size={18} />
            <span>Policies</span>
          </div>
          <span className="badge badge-orange">12</span>
        </Link>
        <Link to="/schemes" className="menu-item" style={{display: 'flex'}}>
          <div className="menu-item-left">
            <Layers size={18} />
            <span>Schemes</span>
          </div>
          <span className="badge badge-orange">14</span>
        </Link>
        <div className="menu-item">
          <div className="menu-item-left">
            <CheckCircle size={18} />
            <span>Reviewed</span>
          </div>
          <span className="badge badge-green">38</span>
        </div>
        <div className="menu-item">
          <div className="menu-item-left">
            <MessageSquare size={18} />
            <span>My Comments</span>
          </div>
        </div>
      </div>

      <div className="menu-group">
        <div className="menu-title">TRACKING</div>
        <div className="menu-item">
          <div className="menu-item-left">
            <UserCheck size={18} />
            <span>Assigned to Me</span>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-item-left">
            <History size={18} />
            <span>Review History</span>
          </div>
        </div>
      </div>

      <div className="menu-group">
        <div className="menu-title">RESOURCES</div>
        <div className="menu-item">
          <div className="menu-item-left">
            <BookOpen size={18} />
            <span>Guidelines</span>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-item-left">
            <HelpCircle size={18} />
            <span>Help & Support</span>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-item-left">
            <Bell size={18} />
            <span>Notifications</span>
          </div>
          <span className="badge badge-purple">5</span>
        </div>
      </div>

      <div className="sidebar-bottom">
        <Link to="/" className="btn-outline">
          <ArrowLeft size={16} />
          <span>Back to Main Site</span>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerSidebar;
