import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Bookmark,
  FileText,
  CheckCircle2,
  Scale,
  User,
  Folder,
  Bell,
  Settings,
  HelpCircle,
  Headphones,
  MessageSquare,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";
import { sidebarSections } from "../../utils/staticContent";

const ICONS = {
  Home,
  Search,
  FileText,
  Bookmark,
  CheckCircle2,
  Scale,
  User,
  Folder,
  Bell,
  Settings,
  HelpCircle,
  Headphones,
  MessageSquare,
};

const NavItem = ({ label, icon, to }) => {
  const Icon = ICONS[icon];
  const location = useLocation();
  const currentPathWithSearch = location.pathname + location.search;
  const active = to === "/citizen/dashboard"
    ? (location.pathname === "/citizen/dashboard" && !location.search)
    : currentPathWithSearch === to || location.pathname === to;

  if (to === "#") {
    return (
      <a
        href="#"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
        {label}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
        active
          ? "bg-orange-50 text-orange-600 font-semibold"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      {label}
    </Link>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
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
            ? "w-64 px-4 border-r translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-0 lg:p-0 lg:border-r-0 lg:overflow-hidden"
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
            
          </div>

          {sidebarSections.map((group, index) => (
            <div key={index} className="flex flex-col gap-1">
              {group.section && (
                <p className="px-3 mb-1 text-xs font-semibold text-gray-400 tracking-wide uppercase">
                  {group.section}
                </p>
              )}
              {group.items.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </div>
          ))}
        </nav>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-[15px] font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Back to Main Site
        </Link>
      </aside>
    </>
  );
};

export default Sidebar;