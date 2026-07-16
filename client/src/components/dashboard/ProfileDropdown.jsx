import React from "react";
import { Home, User, Bookmark, Settings, LogOut } from "lucide-react";
import { profileMenuItems } from "../../data/dashboardData";

const ICONS = {
  Home,
  User,
  Bookmark,
  Settings,
  LogOut,
};

const ProfileDropdown = ({ onClose }) => {
  return (
    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
      {profileMenuItems.map((item, index) => {
        const Icon = ICONS[item.icon];
        const isLast = index === profileMenuItems.length - 1;

        return (
          <React.Fragment key={item.label}>
            {item.danger && <div className="my-1 border-t border-gray-100" />}
            <button
              type="button"
              onClick={onClose}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-[15px] text-left transition-colors ${
                item.danger
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {item.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProfileDropdown;