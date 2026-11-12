import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Menu, LogOut } from 'lucide-react';
import AdminNotificationPopup from './AdminNotificationPopup';

export default function AdminHeader({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const localUser = JSON.parse(localStorage.getItem("user") || "null");
  const displayName = localUser?.fullName || localUser?.name || "Admin";
  const initial = "A";

  return (
    <header className="shrink-0 w-full bg-white border-b border-gray-100 z-30">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
            className="text-gray-500 hover:text-gray-900 transition-colors p-1 cursor-pointer"
          >
            <Menu className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Logo visible on navbar when sidebar is collapsed/hidden */}
          <div className="flex items-center gap-2 lg:hidden">
            <img src="/logo-icon.svg" alt="PolicyGPT logo" className="w-8 h-8 shrink-0" />
            <span className="font-heading text-lg font-bold tracking-tight">
              <span className="text-gray-900">Policy</span>
              <span className="text-[#F2762E]">GPT</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Notification Bell */}
          <div className="relative flex items-center" ref={notifRef}>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => {
                setIsNotifOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
              className="relative flex items-center justify-center h-10 w-10 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Bell className="w-[22px] h-[22px]" strokeWidth={1.8} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {isNotifOpen && (
              <AdminNotificationPopup onClose={() => setIsNotifOpen(false)} />
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-1.5 border border-gray-200 rounded-full p-1 pr-2.5 cursor-pointer bg-white"
            >
              <span className="w-8 h-8 rounded-full bg-[#F2762E] text-white text-sm font-semibold flex items-center justify-center">
                {initial}
              </span>
              <span className="text-sm font-semibold text-gray-700 hidden sm:inline ml-0.5">Admin</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setIsProfileOpen(false);
                    window.location.href = "/";
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[15px] text-left text-red-500 hover:bg-red-50 transition-colors font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" strokeWidth={2} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
