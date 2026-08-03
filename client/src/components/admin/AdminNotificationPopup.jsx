import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ArrowRight } from "lucide-react";
import { fetchAdminNotifications } from "../../services/notificationService";

const AdminNotificationPopup = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAdminNotifications();
        setNotifications(data?.slice(0, 5) || []);
      } catch {
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleViewAll = () => {
    onClose();
    navigate("/admin/dashboard?tab=notifications");
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="absolute right-0 top-full mt-3 w-[300px] bg-white rounded-xl border border-gray-100 shadow-lg z-50 overflow-hidden">

      {/* Notification List */}
      <div className="max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="px-4 py-7 text-center text-sm text-slate-400">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="px-4 py-7 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 mx-auto mb-2">
              <Bell className="h-5 w-5 text-slate-300" strokeWidth={2} />
            </div>
            <p className="text-sm text-slate-400">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id || index}
              className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-orange-50/40 cursor-pointer ${
                index < notifications.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="pt-1.5 shrink-0">
                {!notification.isRead ? (
                  <span className="block w-2 h-2 rounded-full bg-[#FD7A08]" />
                ) : (
                  <span className="block w-2 h-2 rounded-full bg-transparent" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className={`text-[13px] leading-snug ${
                  notification.isRead ? "text-slate-500" : "text-slate-800 font-medium"
                }`}>
                  {notification.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {notification.dateTime || notification.time}
                </p>
              </div>

              {!notification.isRead && (
                <span className="shrink-0 mt-0.5 inline-block rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-[#FD7A08]">
                  New
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100">
        <button
          type="button"
          onClick={handleViewAll}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#FD7A08] hover:bg-orange-50/30 transition-colors cursor-pointer"
        >
          View all notifications
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminNotificationPopup;
