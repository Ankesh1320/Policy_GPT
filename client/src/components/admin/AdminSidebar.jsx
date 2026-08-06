import React from 'react';
import { 
  Shield, 
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
  ArrowLeft,
  ChevronDown,
  ChevronLeft
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isDashboardActive = location.pathname === '/admin/dashboard';
  const isSchemeActive = location.pathname === '/admin/scheme-management';
  const isPolicyActive = location.pathname === '/admin/policy-management';
  const isReportsActive = location.pathname === '/admin/reports';

  const navLinkClass = (isActive) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
      isActive
        ? 'bg-[#FFF7ED] text-[#EA580C] font-semibold'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

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
            ? "w-[275px] px-4 border-r translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-[275px] lg:px-4 lg:border-r lg:translate-x-0"
        }`}
      >
        <nav className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
          {/* Logo container */}
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

          <div className="flex flex-col gap-1 px-1">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                isDashboardActive
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className={`w-[18px] h-[18px] ${isDashboardActive ? "text-[#EA580C]" : "text-gray-600"}`} strokeWidth={2} />
              <span className="whitespace-nowrap">Dashboard</span>
            </Link>
          </div>

          {/* Management Group */}
          <div className="flex flex-col gap-1 px-1">
            <p className="px-3 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">
              Management
            </p>
            <Link
              to="/admin/scheme-management"
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                isSchemeActive
                  ? 'bg-[#FFF7ED] text-[#EA580C] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Layers className={`w-[18px] h-[18px] ${isSchemeActive ? 'text-[#EA580C]' : 'text-gray-600'}`} strokeWidth={2} />
                <span className="whitespace-nowrap">Scheme Management</span>
              </div>
            </Link>
            <Link
              to="/admin/policy-management"
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                isPolicyActive
                  ? 'bg-[#FFF7ED] text-[#EA580C] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className={`w-[18px] h-[18px] ${isPolicyActive ? 'text-[#EA580C]' : 'text-gray-600'}`} strokeWidth={2} />
                <span className="whitespace-nowrap">Policy Management</span>
              </div>
            </Link>
            <SidebarItem icon={<FileBox className="w-[18px] h-[18px]" strokeWidth={2} />} text="Applications" />
            <SidebarItem icon={<Users className="w-[18px] h-[18px]" strokeWidth={2} />} text="Users" />
            <SidebarItem icon={<Settings className="w-[18px] h-[18px]" strokeWidth={2} />} text="Roles & Permissions" />
          </div>

          {/* Analytics Group */}
          <div className="flex flex-col gap-1 px-1">
            <p className="px-3 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">
              Analytics
            </p>
            <SidebarItem icon={<BarChart2 className="w-[18px] h-[18px]" strokeWidth={2} />} text="Analytics" />
            <Link to="/admin/reports" className={navLinkClass(isReportsActive)}>
              <FileText className={`w-[18px] h-[18px] ${isReportsActive ? 'text-[#EA580C]' : 'text-gray-600'}`} strokeWidth={2} />
              <span className="whitespace-nowrap">Reports</span>
            </Link>
          </div>

          {/* Content Group */}
          <div className="flex flex-col gap-1 px-1">
            <p className="px-3 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">
              Content
            </p>
            <SidebarItem icon={<MessageSquare className="w-[18px] h-[18px]" strokeWidth={2} />} text="Notifications" />
            <SidebarItem icon={<HelpCircle className="w-[18px] h-[18px]" strokeWidth={2} />} text="FAQs" />
            <SidebarItem icon={<ImageIcon className="w-[18px] h-[18px]" strokeWidth={2} />} text="Banners" />
          </div>
        </nav>

        {/* Bottom Back Button */}
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

function SidebarItem({ icon, text, hasDropdown }) {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
      <div className="flex items-center gap-3 min-w-0">
        {icon}
        <span className="whitespace-nowrap">{text}</span>
      </div>
      {hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-1" />}
    </div>
  );
}
