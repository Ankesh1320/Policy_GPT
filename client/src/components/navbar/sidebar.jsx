import React from "react";
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
} from "lucide-react";
import { sidebarSections } from "../../utils/staticContent";

const ICONS = {
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
};

const NavItem = ({ label, icon, active }) => {
  const Icon = ICONS[icon];
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
        active
          ? "bg-orange-50 text-orange-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      {label}
    </a>
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
        className={`fixed lg:relative inset-y-0 lg:inset-y-auto left-0 h-full w-64 bg-white border-r border-gray-100 px-4 py-6 flex flex-col justify-between z-50 shrink-0 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
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

        <button
          type="button"
          className="flex items-center justify-center gap-2 text-[15px] font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Back to Main Site
        </button>
      </aside>
    </>
  );
};

export default Sidebar;