import React from "react";

export default function OptionButton({ optionText, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(optionText)}
      className={`w-full text-left flex items-center justify-between px-6 py-4 sm:py-4.5 border-2 rounded-[20px] bg-white transition-all cursor-pointer group ${
        isSelected
          ? "border-brand-orange bg-card-orange/60 shadow-btn"
          : "border-border-warm hover:border-brand-orange/70 hover:bg-card-orange/30"
      }`}
    >
      <span
        className={`font-body font-semibold text-base sm:text-[17px] transition-colors ${
          isSelected ? "text-brand-orange" : "text-text-primary group-hover:text-brand-orange"
        }`}
      >
        {optionText}
      </span>

      {/* Right Chevron Icon */}
      <svg
        className={`w-5 h-5 transition-all group-hover:translate-x-1 ${
          isSelected ? "text-brand-orange" : "text-text-slate group-hover:text-brand-orange"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
