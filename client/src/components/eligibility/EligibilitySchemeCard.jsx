import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function EligibilitySchemeCard({ scheme }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const badgeTag = scheme.badgeTag || "Popular";
  const isPopular = badgeTag === "Popular";

  return (
    <div className="group bg-white rounded-[20px] p-6 shadow-sm border border-border-warm flex flex-col justify-between hover:shadow-card transition-all duration-200">
      <div>
        {/* Top Badges & Bookmark Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {/* Tag Badge (Popular / New) */}
            <span
              className={`px-3 py-1 rounded-full font-body text-xs font-semibold ${
                isPopular
                  ? "bg-card-orange text-brand-orange"
                  : "bg-badge-green-bg text-badge-green-text"
              }`}
            >
              {badgeTag}
            </span>

            {/* Eligible Badge */}
            <span className="px-3 py-1 rounded-full font-body text-xs font-semibold bg-badge-green-bg text-badge-green-text flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-badge-green-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Eligible
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-text-slate hover:text-brand-orange transition-colors p-1"
            aria-label="Bookmark scheme"
          >
            <svg
              className={`w-5 h-5 ${isBookmarked ? "fill-brand-orange text-brand-orange" : "fill-none stroke-current"}`}
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Scheme Title */}
        <h3 className="font-heading font-bold text-slate-heading text-lg leading-[26px] mb-1 line-clamp-2 group-hover:text-brand-orange transition-colors">
          {scheme.title}
        </h3>

        {/* Department Subtitle */}
        <p className="font-body text-sm font-medium leading-[21px] text-text-secondary mb-3">
          {scheme.department}
        </p>

        {/* Short Description */}
        <p className="font-body text-sm text-text-body line-clamp-2 mb-6 font-normal leading-relaxed">
          {scheme.description}
        </p>

        {/* 3 Key Stats Pills */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {/* Stat 1: Benefit */}
          <div className="bg-page-warm/60 border border-border-warm/40 rounded-xl p-2.5 text-center">
            <p className="font-heading font-bold text-xs text-slate-heading truncate">
              {scheme.benefitStat || "₹6,000..."}
            </p>
            <p className="font-body text-[11px] text-text-secondary font-medium">Benefit</p>
          </div>

          {/* Stat 2: Applicants */}
          <div className="bg-page-warm/60 border border-border-warm/40 rounded-xl p-2.5 text-center">
            <p className="font-heading font-bold text-xs text-slate-heading truncate">
              {scheme.applicantsStat || "11.8 Cr..."}
            </p>
            <p className="font-body text-[11px] text-text-secondary font-medium">Applicants</p>
          </div>

          {/* Stat 3: Deadline */}
          <div className="bg-page-warm/60 border border-border-warm/40 rounded-xl p-2.5 text-center">
            <p className="font-heading font-bold text-xs text-slate-heading truncate">
              {scheme.deadlineStat || "Ongoing"}
            </p>
            <p className="font-body text-[11px] text-text-secondary font-medium">Deadline</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <Link
        to={scheme._id ? `/policies/${scheme._id}` : "/policies"}
        className="w-full h-[43px] inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-card-orange px-5 font-body text-sm font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white cursor-pointer"
      >
        <span>View Details</span>
        <span className="text-lg font-normal">→</span>
      </Link>
    </div>
  );
}
