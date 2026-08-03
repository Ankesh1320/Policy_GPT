import React from "react";
import { Trash2 } from "lucide-react";

const NotificationRow = ({ notification, showDate = false, showStatus = false, showDelete = false, onDelete }) => {
  return (
    <div
      className={`grid gap-4 items-center px-6 py-5 transition-colors hover:bg-orange-50/30 ${
        showDate ? "sm:grid-cols-[minmax(0,1fr)_200px_100px_80px]" : ""
      }`}
    >
      {/* Notification message */}
      <div className="flex items-center gap-3 min-w-0">
        <p className="text-sm text-slate-700 truncate">
          {notification.title}
        </p>
      </div>

      {/* Date & Time */}
      {showDate && (
        <p className="text-sm text-slate-500">{notification.dateTime || notification.time}</p>
      )}

      {/* Status badge */}
      {showStatus && (
        <div>
          <span
            className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
              notification.isRead
                ? "bg-slate-100 text-slate-500"
                : "text-[#FD7A08]"
            }`}
          >
            {notification.isRead ? "Read" : "New"}
          </span>
        </div>
      )}

      {/* Delete action */}
      {showDelete && (
        <button
          type="button"
          onClick={() => onDelete(notification.id)}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#FD7A08] hover:bg-orange-50 transition-colors cursor-pointer"
          aria-label={`Delete notification: ${notification.title}`}
        >
          <Trash2 className="w-[18px] h-[18px]" />
        </button>
      )}
    </div>
  );
};

export default NotificationRow;
