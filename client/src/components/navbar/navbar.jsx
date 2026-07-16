import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import { navLinks, currentUser } from "../../data/dashboardData";
import ProfileDropdown from "../Dashboard/ProfileDropdown";
import logoFull from "../../assets/logos/logo-full.svg";

const Navbar = () => {
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
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={logoFull} alt="PolicyGPT" className="h-9 w-auto" />
        </Link>

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
                {currentUser.initial}
              </span>
              <span className="text-[15px] font-medium text-gray-800">
                {currentUser.firstName}
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