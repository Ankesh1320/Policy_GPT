import React from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

const RecentSearches = ({ searches = [] }) => {
  const navigate = useNavigate();

  const handleTagClick = (term) => {
    navigate(`/schemes?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-border-light shadow-sm p-6">
      <h2 className="font-heading text-lg font-bold text-slate-heading mb-4">Recent Searches</h2>

      {searches.length === 0 ? (
        <div className="py-6 text-center flex flex-col items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center mb-2">
            <LuSearch className="h-5 w-5 text-slate-300" />
          </div>
          <p className="text-sm text-text-secondary">
            No recent searches.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {searches.map((term, index) => {
            // cycle through colors to make it visually attractive and distinct
            const themes = [
              "bg-orange-50/60 border-orange-100/80 text-brand-orange hover:bg-orange-50 hover:border-brand-orange",
              "bg-blue-50/60 border-blue-100/80 text-brand-blue hover:bg-blue-50 hover:border-brand-blue",
              "bg-emerald-50/60 border-emerald-100/80 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600",
              "bg-purple-50/60 border-purple-100/80 text-purple-600 hover:bg-purple-50 hover:border-purple-600"
            ];
            const themeClass = themes[index % themes.length];

            return (
              <button
                key={term}
                onClick={() => handleTagClick(term)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold border rounded-full px-3.5 py-1.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-sm cursor-pointer ${themeClass}`}
              >
                <LuSearch className="h-3.5 w-3.5 opacity-80" />
                <span>{term}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentSearches;