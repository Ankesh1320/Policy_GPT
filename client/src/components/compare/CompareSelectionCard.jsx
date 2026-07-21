import React from "react";

export default function CompareSelectionCard({
  allSchemes,
  selectedSchemes,
  onSetSchemeAt,
  onSwap,
  isEditing,
  onEditSelection,
  onConfirmCompare,
}) {
  const scheme1 = selectedSchemes[0] || allSchemes[0];
  const scheme2 = selectedSchemes[1] || allSchemes[1];

  if (!isEditing) {
    return (
      <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100 max-w-[1280px] mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
        <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
          {/* Scheme 1 Summary */}
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-extrabold text-[#16A34A] text-lg sm:text-xl">
              {scheme1.title}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {scheme1.department}
            </p>
          </div>

          {/* VS Badge */}
          <div className="px-3.5 py-1.5 rounded-full bg-[#FFF3EA] text-[#E04F16] font-bold text-xs uppercase tracking-wider shrink-0 shadow-xs">
            VS
          </div>

          {/* Scheme 2 Summary */}
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-extrabold text-[#1E3A8A] text-lg sm:text-xl">
              {scheme2.title}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {scheme2.department}
            </p>
          </div>
        </div>

        {/* Change Selection Action */}
        <button
          type="button"
          onClick={onEditSelection}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-[#E04F16] font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4 text-[#E04F16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Change Selection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100 max-w-[1280px] mx-auto mb-8 transition-all">
      <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4">
        {/* Dropdown 1 */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Select first scheme
          </label>
          <select
            value={scheme1.id}
            onChange={(e) => onSetSchemeAt(0, e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-700 text-sm font-body focus:outline-none focus:border-[#FD7A08] focus:ring-1 focus:ring-[#FD7A08] cursor-pointer"
          >
            {allSchemes.map((s) => (
              <option key={s.id} value={s.id} disabled={s.id === scheme2.id}>
                {s.title} ({s.category})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center items-center pb-1">
          <button
            type="button"
            onClick={onSwap}
            title="Swap schemes"
            className="w-10 h-10 rounded-full bg-[#FFF3EA] text-[#FD7A08] hover:bg-[#FFEAE0] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-5 h-5 text-[#FD7A08]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* Dropdown 2 */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Select second scheme
          </label>
          <select
            value={scheme2.id}
            onChange={(e) => onSetSchemeAt(1, e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-700 text-sm font-body focus:outline-none focus:border-[#FD7A08] focus:ring-1 focus:ring-[#FD7A08] cursor-pointer"
          >
            {allSchemes.map((s) => (
              <option key={s.id} value={s.id} disabled={s.id === scheme1.id}>
                {s.title} ({s.category})
              </option>
            ))}
          </select>
        </div>

        {/* Compare Schemes Action Button */}
        <div className="pb-0.5">
          <button
            type="button"
            onClick={onConfirmCompare}
            className="w-full md:w-auto px-6 py-3 rounded-xl border border-[#FD7A08] bg-white text-[#FD7A08] font-semibold text-sm hover:bg-[#FFF5EB] transition-colors cursor-pointer"
          >
            Compare Schemes
          </button>
        </div>
      </div>
    </div>
  );
}
