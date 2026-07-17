import React from "react";
import { Bookmark, CheckCircle2, FileText, Clock } from "lucide-react";

const ICONS = {
  Bookmark,
  CheckCircle2,
  FileText,
  Clock,
};

const STAT_CONFIG = [
  {
    id: "saved",
    key: "savedSchemes",
    icon: "Bookmark",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    label: "Saved Schemes",
  },
  {
    id: "eligible",
    key: "eligibleSchemes",
    icon: "CheckCircle2",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    label: "Eligible Schemes",
  },
  {
    id: "applications",
    key: "applications",
    icon: "FileText",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    label: "Applications",
  },
  {
    id: "deadlines",
    key: "deadlines",
    icon: "Clock",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    label: "Upcoming Deadlines",
  },
];

const StatCard = ({ icon, iconBg, iconColor, value, label }) => {
  const Icon = ICONS[icon];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
      </div>
      <p className="font-heading mt-5 text-[28px] font-bold text-gray-900 leading-none">
        {value}
      </p>
      <p className="mt-1.5 text-[15px] text-gray-500">{label}</p>
    </div>
  );
};


const StatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {STAT_CONFIG.map((card) => (
        <StatCard key={card.id} {...card} value={stats?.[card.key] ?? 0} />
      ))}
    </div>
  );
};

export default StatCards;