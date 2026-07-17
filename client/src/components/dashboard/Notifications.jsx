import React from "react";

const NotificationRow = ({ title, time, dotColor }) => (
  <div className="bg-[#F3F0FC] rounded-2xl px-5 py-4">
    <div className="flex items-start gap-2.5">
      {dotColor && (
        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
      )}
      <div className={!dotColor ? "pl-4" : ""}>
        <p className="text-[15px] font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{time}</p>
      </div>
    </div>
  </div>
);

const Notifications = ({ notifications = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          You're all caught up.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((item) => (
            <NotificationRow key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;