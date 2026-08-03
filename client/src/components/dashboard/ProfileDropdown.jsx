import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Bookmark, Settings, LogOut } from "lucide-react";
import { profileMenuItems } from "../../utils/staticContent";

const ICONS = {
  Home,
  User,
  Bookmark,
  Settings,
  LogOut,
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
      if (item.label.toLowerCase() === "dashboard") {
        navigate("/citizen/dashboard");
      } else if (item.label.toLowerCase() === "profile") {
        navigate("/citizen/dashboard");
      } else if (item.label.toLowerCase() === "saved schemes") {
        navigate("/citizen/dashboard");
      } else if (item.label.toLowerCase() === "settings") {
        navigate("/citizen/dashboard");
      }
    }
  };

  return (
    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
      {profileMenuItems.map((item) => {
        const Icon = ICONS[item.icon];
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