import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import ProfileDropdown from "../dashboard/ProfileDropdown";
import NotificationPopup from "./NotificationPopup";

const Navbar = ({ userName = "", onMenuClick }) => {
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
  const displayName = userName || localUser?.fullName || localUser?.name || "";
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

  return (
    <header className="shrink-0 w-full bg-white border-b border-gray-100 z-30">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
            className="text-gray-500 hover:text-gray-900 transition-colors p-1"
          >
            <Menu className="w-5 h-5" strokeWidth={2} />
          </button>
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
              <NotificationPopup onClose={() => setIsNotifOpen(false)} />
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
              className="flex items-center gap-1.5 border border-gray-200 rounded-full p-1 pr-2.5"
            >
              <span className="w-8 h-8 rounded-full bg-[#F2762E] text-white text-sm font-semibold flex items-center justify-center">
                {initial}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isProfileOpen && (
              <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;