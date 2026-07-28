import React from "react";

const BADGE_STYLES = {
  Approved: "bg-[#E6F4EA] text-[#137333] font-semibold",
  "Under Review": "bg-[#FCE8E6] text-[#C5221F] font-semibold",
  Submitted: "bg-[#FEF7E0] text-[#B06000] font-semibold",
  Rejected: "bg-[#FCE8E6] text-[#C5221F] font-semibold",
};

const StatusRow = ({ name, status }) => (
  <div className="flex items-center justify-between">
    <p className="text-[14px] font-semibold text-gray-900">{name}</p>
    <span
      className={`text-[11px] px-2.5 py-1 rounded-full ${BADGE_STYLES[status] || "bg-gray-100 text-gray-700 font-semibold"}`}
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