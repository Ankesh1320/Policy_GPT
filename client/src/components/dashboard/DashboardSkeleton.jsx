import React from "react";

const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

/**
 * Skeleton placeholder shown while useDashboard() is loading.
 * Mirrors the real layout's proportions (welcome card, 4 stat cards,
 * two-column content) so there's no layout shift once data arrives.
 */
const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome card */}
      <div className="w-full rounded-2xl bg-gray-100 px-10 py-8">
        <Pulse className="h-4 w-28 mb-3" />
        <Pulse className="h-9 w-64 mb-4" />
        <Pulse className="h-4 w-96" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <Pulse className="w-11 h-11 rounded-full mb-5" />
            <Pulse className="h-7 w-12 mb-2" />
            <Pulse className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Two-column content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <Pulse className="h-5 w-32 mb-5" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Pulse key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <Pulse className="h-5 w-32 mb-5" />
              <Pulse className="h-4 w-full mb-2" />
              <Pulse className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;