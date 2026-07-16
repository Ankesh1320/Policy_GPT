import React from "react";
import { Bookmark, CheckCircle2, FileText, Clock } from "lucide-react";
import { statCards } from "../../data/dashboardData";

const ICONS = {
  Bookmark,
  CheckCircle2,
  FileText,
  Clock,
};

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

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {statCards.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default StatCards;