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
  ChevronLeft,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function VolunteerSidebar({ isOpen, onClose, notifCount = 5 }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab');

  const is = (path, tab) =>
    location.pathname === path && (!tab || activeTab === tab);

  const navLinkClass = (active) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
      active
        ? 'bg-[#FFF7ED] text-[#EA580C] font-semibold'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  const iconClass = (active) =>
    `w-[18px] h-[18px] ${active ? 'text-[#EA580C]' : 'text-gray-500'}`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-0 left-0 h-screen bg-white border-gray-100 py-6 flex flex-col justify-between z-50 shrink-0 transition-all duration-200 ${
          isOpen
            ? 'w-[275px] px-4 border-r translate-x-0'
            : '-translate-x-full lg:translate-x-0 lg:w-[275px] lg:px-4 lg:border-r lg:translate-x-0'
        }`}
      >
        <nav className="flex flex-col gap-5 overflow-y-auto scrollbar-hide">
          {/* Logo */}
          <div className="flex items-center justify-between px-3 mb-2 shrink-0">
            <div className="flex items-center gap-2.5">
              <img src="/logo-icon.svg" alt="PolicyGPT logo" className="w-9 h-9 shrink-0" />
              <span className="font-heading text-[20px] font-bold tracking-tight">
                <span className="text-gray-900">Policy</span>
                <span className="text-[#F2762E]">GPT</span>
              </span>
            </div>
            {isOpen && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer lg:hidden"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Dashboard */}
          <div className="flex flex-col gap-1 px-1">
            <Link to="/volunteer/dashboard" className={navLinkClass(is('/volunteer/dashboard') && !activeTab)}>
              <LayoutDashboard className={iconClass(is('/volunteer/dashboard') && !activeTab)} strokeWidth={2} />
              <span className="whitespace-nowrap">Dashboard</span>
            </Link>
          </div>

          {/* Review Group */}
          <div className="flex flex-col gap-1 px-1">
            <p className="px-3 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">Review</p>

            <Link to="/volunteer/dashboard?tab=schemes" className={navLinkClass(is('/volunteer/dashboard', 'schemes'))}>
              <Layers className={iconClass(is('/volunteer/dashboard', 'schemes'))} strokeWidth={2} />
              <span className="whitespace-nowrap flex-1">Schemes</span>
            </Link>
            <Link to="/volunteer/dashboard?tab=policies" className={navLinkClass(is('/volunteer/dashboard', 'policies'))}>
              <FileText className={iconClass(is('/volunteer/dashboard', 'policies'))} strokeWidth={2} />
              <span className="whitespace-nowrap flex-1">Policies</span>
            </Link>
            <Link to="/volunteer/dashboard?tab=reviewed" className={navLinkClass(is('/volunteer/dashboard', 'reviewed'))}>
              <CheckCircle className={iconClass(is('/volunteer/dashboard', 'reviewed'))} strokeWidth={2} />
              <span className="whitespace-nowrap flex-1">Reviewed</span>
            </Link>
            <Link to="/volunteer/dashboard?tab=comments" className={navLinkClass(is('/volunteer/dashboard', 'comments'))}>
              <MessageSquare className={iconClass(is('/volunteer/dashboard', 'comments'))} strokeWidth={2} />
              <span className="whitespace-nowrap">My Comments</span>
            </Link>
          </div>

          {/* Tracking Group */}
          <div className="flex flex-col gap-1 px-1">
            <p className="px-3 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">Tracking</p>
            <Link to="/volunteer/dashboard?tab=assigned" className={navLinkClass(is('/volunteer/dashboard', 'assigned'))}>
              <UserCheck className={iconClass(is('/volunteer/dashboard', 'assigned'))} strokeWidth={2} />
              <span className="whitespace-nowrap">Assigned to Me</span>
            </Link>
            <Link to="/volunteer/dashboard?tab=history" className={navLinkClass(is('/volunteer/dashboard', 'history'))}>
              <History className={iconClass(is('/volunteer/dashboard', 'history'))} strokeWidth={2} />
              <span className="whitespace-nowrap">Review History</span>
            </Link>
          </div>

          {/* Resources Group */}
          <div className="flex flex-col gap-1 px-1">
            <p className="px-3 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">Resources</p>
            <SidebarItem icon={<BookOpen className="w-[18px] h-[18px]" strokeWidth={2} />} text="Guidelines" />
            <SidebarItem icon={<HelpCircle className="w-[18px] h-[18px]" strokeWidth={2} />} text="Help & Support" />
            <Link
              to="/volunteer/dashboard?tab=notifications"
              className={navLinkClass(is('/volunteer/dashboard', 'notifications'))}
            >
              <Bell className={iconClass(is('/volunteer/dashboard', 'notifications'))} strokeWidth={2} />
              <span className="whitespace-nowrap flex-1">Notifications</span>
              {notifCount > 0 && (
                <span className="ml-auto bg-[#F2762E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {notifCount}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Back to Main Site */}
        <div className="px-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-[15px] font-semibold text-gray-700 border border-gray-200 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500" strokeWidth={2} />
            <span className="whitespace-nowrap">Back to Main Site</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, text }) {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
      {icon}
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
}
