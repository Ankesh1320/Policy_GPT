import React from "react";
import EligibilitySchemeCard from "./EligibilitySchemeCard";

export default function EligibilityResults({ results, filteredSchemes, onEditCriteria }) {
  const schemeCount = filteredSchemes.length > 0 ? filteredSchemes.length : 18;

  return (
    <div className="w-full max-w-[1280px] mx-auto py-6">
      {/* Top Green Checkmark Icon Circle */}
      <div className="w-16 h-16 rounded-full bg-[#E8F8EE] flex items-center justify-center mx-auto mb-6 shadow-sm">
        <svg className="w-8 h-8 text-[#12B76A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Main Headline */}
      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#101828] text-center mb-3 tracking-tight">
        You Are Eligible for {schemeCount} Schemes!
      </h2>

      {/* Subtitle */}
      <p className="text-[#475467] text-base sm:text-lg text-center mb-12 font-normal max-w-2xl mx-auto">
        Based on your profile, here are the top matched government schemes for you.
      </p>

      {/* Schemes Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <EligibilitySchemeCard key={scheme._id || scheme.title} scheme={scheme} />
        ))}
      </div>

      {/* Retake Questionnaire Action Footer */}
      <div className="mt-12 text-center">
        <button
          onClick={onEditCriteria}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <span>✏️ Retake Questionnaire</span>
        </button>
      </div>
    </div>
  );
}
