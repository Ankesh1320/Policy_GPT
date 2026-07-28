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
    iconBg: "bg-[#EFF6FF]",
    iconColor: "text-[#3B82F6]",
    label: "Saved Schemes",
  },
  {
    id: "eligible",
    key: "eligibleSchemes",
    icon: "CheckCircle2",
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#10B981]",
    label: "Eligible Schemes",
  },
  {
    id: "applications",
    key: "applications",
    icon: "FileText",
    iconBg: "bg-[#FFF7ED]",
    iconColor: "text-[#F97316]",
    label: "Applications",
  },
  {
    id: "deadlines",
    key: "deadlines",
    icon: "Clock",
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#A855F7]",
    label: "Upcoming Deadlines",
  },
];

const StatCard = ({ icon, iconBg, iconColor, value, label }) => {
  const Icon = ICONS[icon];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
      </div>
      <div>
        <p className="font-heading text-[26px] font-bold text-gray-900 leading-none">
          {value}
        </p>
        <p className="mt-1 text-[13px] font-medium text-gray-500 leading-tight">
          {label}
        </p>
      </div>
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