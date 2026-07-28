import React from "react";

const RecentSearches = ({ searches = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Recent Searches</h2>

      {searches.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No recent searches.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {searches.map((term) => (
            <span
              key={term}
              className="text-xs font-semibold text-[#4B5563] bg-[#F3F4F6] rounded-full px-3.5 py-1.5 transition-colors hover:bg-gray-200 cursor-pointer"
            >
              {term}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentSearches;