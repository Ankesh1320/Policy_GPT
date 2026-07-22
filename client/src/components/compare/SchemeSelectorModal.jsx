import React from "react";

const categories = [
  "All",
  "Agriculture",
  "Healthcare",
  "Financial Aid",
  "Housing",
  "Education",
];

export default function SchemeSelectorModal({
  isOpen,
  onClose,
  availableSchemes,
  onAddScheme,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-heading/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-border-warm max-h-[85vh] flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border-light pb-4 mb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-heading">
              Select Scheme to Compare
            </h2>
            <p className="font-body text-xs text-text-secondary mt-0.5">
              Choose from verified central and state schemes
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-text-muted hover:bg-gray-200 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Search scheme by title, keyword, or ministry..."
            className="w-full rounded-2xl border border-border-warm bg-cream/30 px-4 py-3 font-body text-sm text-text-primary focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          />

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`rounded-full px-3.5 py-1 font-heading text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-orange text-white shadow-sm"
                    : "bg-gray-100 text-text-muted hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes List */}
        <div className="overflow-y-auto max-h-[350px] space-y-3 pr-2 border-t border-border-light pt-4">
          {availableSchemes.length > 0 ? (
            availableSchemes.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => {
                  onAddScheme(scheme.id);
                  onClose();
                }}
                className="group p-4 rounded-2xl border border-border-warm bg-white hover:border-brand-blue hover:bg-card-blue/30 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-cream text-brand-orange font-heading text-[10px] font-bold">
                      {scheme.category}
                    </span>
                    <span className="text-[11px] text-text-secondary font-medium">
                      {scheme.department}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-slate-heading text-base group-hover:text-brand-blue transition-colors">
                    {scheme.title}
                  </h4>
                  <p className="font-body text-xs text-text-muted line-clamp-1 mt-0.5">
                    {scheme.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="shrink-0 rounded-xl bg-brand-blue px-4 py-2 font-heading text-xs font-semibold text-white shadow-sm transition-all group-hover:bg-brand-blue-dark"
                >
                  + Select
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-text-secondary font-body text-sm">
              No matching available schemes found.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-4 border-t border-border-light flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border-warm bg-white px-5 py-2 font-heading text-sm font-semibold text-text-secondary hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
