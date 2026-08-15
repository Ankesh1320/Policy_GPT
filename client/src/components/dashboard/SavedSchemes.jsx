import React from "react";
import { ChevronRight, Sprout, HeartPulse, Home, Briefcase } from "lucide-react";

const ICONS = {
  Sprout,
  HeartPulse,
  Home,
  Briefcase,
};

const SchemeRow = ({ name, subtitle, icon, iconBg, status }) => {
  const Icon = ICONS[icon] || Briefcase;

  return (
    <div className="flex items-center justify-between bg-cream rounded-2xl px-5 py-4 transition-all hover:bg-[#F2EAD9]">
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}
        >
          <Icon className="w-5 h-5 text-gray-700" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[15px] font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {status && (
          <span className="text-xs font-semibold bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full">
            {status}
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
      </div>
    </div>
  );
};

const SavedSchemes = ({ schemes = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-lg font-bold text-gray-900">Saved Schemes</h2>
        <a
          href="#"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          View all
        </a>
      </div>

      {schemes.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No saved schemes yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {schemes.map((scheme) => (
            <SchemeRow key={scheme._id || scheme.id} {...scheme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSchemes;