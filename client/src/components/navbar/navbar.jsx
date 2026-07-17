import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, ShieldCheck } from "lucide-react";
import { navLinks } from "../../utils/staticContent";
import ProfileDropdown from "../Dashboard/ProfileDropdown";

const Navbar = ({ userName = "" }) => {
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
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#F2762E] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-heading text-[22px] font-bold tracking-tight">
            <span className="text-gray-900">Policy</span>
            <span className="text-[#F2762E]">GPT</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: notifications + profile */}
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
              className="flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-full bg-[#A13A3A] text-white text-sm font-semibold flex items-center justify-center">
                {initial}
              </span>
              <span className="text-[15px] font-medium text-gray-800">
                {firstName}
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