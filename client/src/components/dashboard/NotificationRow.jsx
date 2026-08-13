import React from "react";
import { Trash2 } from "lucide-react";

const NotificationRow = ({ notification, showDate = false, showStatus = false, showDelete = false, onDelete }) => {
  return (
    <div
      className={`grid gap-4 items-center px-6 py-5 transition-colors hover:bg-orange-50/30 ${
        showDate ? "grid-cols-1 sm:grid-cols-12" : "grid-cols-1"
      }`}
    >
      {/* Notification message */}
      <div className={`flex items-center gap-3 min-w-0 ${showDate ? "col-span-12 sm:col-span-5" : ""}`}>
        <p className="text-sm text-slate-700 font-medium whitespace-pre-wrap">
          {notification.title}
        </p>
      </div>

      {/* Date & Time */}
      {showDate && (
        <p className="col-span-12 sm:col-span-3 text-sm text-slate-500 whitespace-nowrap">
          {notification.dateTime || notification.time}
        </p>
      )}

      {/* Status badge */}
      {showStatus && (
        <div className="col-span-6 sm:col-span-2">
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
        <div className="col-span-6 sm:col-span-2 flex sm:justify-end">
          <button
            type="button"
            onClick={() => onDelete(notification.id)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#FD7A08] hover:bg-orange-50 transition-colors cursor-pointer"
            aria-label={`Delete notification: ${notification.title}`}
          >
            <Trash2 className="w-[18px] h-[18px]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationRow;
