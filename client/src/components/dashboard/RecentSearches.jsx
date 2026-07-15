import React from "react";
import { recentSearches } from "../../data/dashboardData";

const RecentSearches = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">Recent Searches</h2>

      <div className="flex flex-wrap gap-2.5">
        {recentSearches.map((term) => (
          <span
            key={term}
            className="text-sm text-gray-700 bg-gray-100 rounded-full px-4 py-1.5"
          >
            {term}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;