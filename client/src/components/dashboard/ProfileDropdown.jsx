import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Bookmark, Settings, LogOut, Bell, MessageSquare } from "lucide-react";
import { profileMenuItems } from "../../utils/staticContent";

const ICONS = {
  Home,
  User,
  Bookmark,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
};

const ProfileDropdown = ({ onClose }) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.danger || item.label.toLowerCase() === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      onClose();
      navigate("/");
    } else {
      onClose();
      const label = item.label.toLowerCase();
      if (label === "dashboard") {
        navigate("/citizen/dashboard");
      } else if (label === "profile") {
        navigate("/citizen/dashboard?tab=profile");
      } else if (label === "saved schemes") {
        navigate("/citizen/dashboard?tab=saved");
      } else if (label === "notifications") {
        navigate("/citizen/dashboard?tab=notifications");
      } else if (label === "feedback") {
        navigate("/citizen/dashboard?tab=feedback");
      } else if (label === "settings") {
        navigate("/citizen/dashboard?tab=settings");
      }
    }
  };

  return (
    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
      {profileMenuItems.map((item) => {
        const Icon = ICONS[item.icon] || User;
        return (
          <Fragment key={item.label}>
            {item.danger && <div className="my-1 border-t border-gray-100" />}
            <button
              type="button"
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-[15px] text-left transition-colors ${
                item.danger
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {item.label}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ProfileDropdown;