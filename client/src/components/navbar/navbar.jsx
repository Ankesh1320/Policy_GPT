import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import ProfileDropdown from "../Dashboard/ProfileDropdown";

const Navbar = ({ userName = "", onMenuClick }) => {
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

  const firstName = userName.split(" ")[0] || "";
  const initial = userName.charAt(0).toUpperCase() || "?";

  return (
    <header className="shrink-0 w-full bg-white border-b border-gray-100 z-30">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="PolicyGPT logo" className="w-9 h-9 rounded-full shrink-0" />
            <span className="font-heading text-[20px] font-bold tracking-tight">
              <span className="text-gray-900">Policy</span>
              <span className="text-[#F2762E]">GPT</span>
            </span>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Menu className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Bell className="w-[22px] h-[22px]" strokeWidth={1.8} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 border border-gray-200 rounded-full pl-1 pr-3 py-1"
            >
              <span className="w-8 h-8 rounded-full bg-[#F2762E] text-white text-sm font-semibold flex items-center justify-center">
                {initial}
              </span>
              <span className="text-[15px] font-medium text-gray-800">
                {userName || firstName}
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