import React from "react";

const BADGE_STYLES = {
  success: "bg-green-50 text-green-600",
  warning: "bg-orange-50 text-orange-600",
  danger: "bg-red-50 text-red-600",
};

const StatusRow = ({ name, status, variant }) => (
  <div className="flex items-center justify-between">
    <p className="text-[15px] font-medium text-gray-900">{name}</p>
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full ${BADGE_STYLES[variant] || BADGE_STYLES.warning}`}
    >
      {status}
    </span>
  </div>
);

const ApplicationStatus = ({ applications = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">
        Application Status
      </h2>

      {applications.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No applications submitted yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((item) => (
            <StatusRow key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;