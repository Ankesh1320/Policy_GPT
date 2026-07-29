import React, { useState, useMemo } from "react";
import EligibilitySchemeCard from "./EligibilitySchemeCard";

export default function EligibilityResults({ results, onEditCriteria }) {
  const [sortBy, setSortBy] = useState("Highest Match");

  // Normalize evaluated items
  const evaluatedItems = useMemo(() => {
    return Array.isArray(results) ? results : (results?.schemes || []);
  }, [results]);

  // Filter and sort the evaluated items
  const filteredAndSorted = useMemo(() => {
    let list = [...evaluatedItems];


    // Apply sorting
    if (sortBy === "Highest Match") {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === "Newest") {
      list.sort((a, b) => {
        const dateA = a.scheme?.publishedDate || "";
        const dateB = b.scheme?.publishedDate || "";
        return dateB.localeCompare(dateA);
      });
    } else if (sortBy === "Alphabetical") {
      list.sort((a, b) => {
        const titleA = a.scheme?.title || "";
        const titleB = b.scheme?.title || "";
        return titleA.localeCompare(titleB);
      });
    }

    return list;
  }, [evaluatedItems, sortBy]);

  const eligibleCount = filteredAndSorted.length;

  return (
    <div className="w-full max-w-[1280px] mx-auto py-6">
      {/* Top Green Checkmark Icon Circle */}
      <div className="w-16 h-16 rounded-full bg-[#E8F8EE] flex items-center justify-center mx-auto mb-6 shadow-sm">
        <svg className="w-8 h-8 text-[#12B76A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Main Headline */}
      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-heading text-center mb-3 tracking-tight">
        You Are Eligible for {eligibleCount} Schemes!
      </h2>

      {/* Subtitle */}
      <p className="font-body text-text-body text-base sm:text-lg text-center mb-10 font-medium max-w-2xl mx-auto">
        Based on your profile, here are the top matched government schemes for you.
      </p>

      {/* Sorting Controls */}
      <div className="flex justify-end gap-4 mb-8 bg-white p-4 rounded-2xl border border-border-warm shadow-sm">
        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="font-body text-xs sm:text-sm font-medium text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 border border-border-warm rounded-full bg-white text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-brand-orange/30 cursor-pointer font-medium"
          >
            <option value="Highest Match">Highest Match</option>
            <option value="Newest">Newest</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Schemes Grid (3 Columns) */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((item) => (
            <EligibilitySchemeCard key={item.scheme?._id || item.scheme?.title} scheme={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-border-warm bg-white px-6 py-16 text-center">
          <p className="font-heading text-lg font-bold text-slate-heading">No schemes match this filter</p>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Try choosing a different category or retake the questionnaire with different answers.
          </p>
        </div>
      )}

      {/* Retake Questionnaire Action Footer */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onEditCriteria}
          className="inline-flex h-[43px] items-center justify-center gap-2 px-6 rounded-full border border-border-light bg-white text-slate-muted font-body text-sm font-normal transition-colors hover:border-brand-orange hover:text-brand-orange cursor-pointer"
        >
          <span>✏️ Retake Questionnaire</span>
        </button>
      </div>
    </div>
  );
}
