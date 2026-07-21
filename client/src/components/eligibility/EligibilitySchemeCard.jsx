import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function EligibilitySchemeCard({ scheme }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const badgeTag = scheme.badgeTag || "Popular";
  const isPopular = badgeTag === "Popular";

  return (
    <div className="group bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div>
        {/* Top Badges & Bookmark Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {/* Tag Badge (Popular / New) */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isPopular
                  ? "bg-[#FFF3EA] text-[#E04F16]"
                  : "bg-[#ECFDF3] text-[#027A48]"
              }`}
            >
              {badgeTag}
            </span>

            {/* Eligible Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF3] text-[#027A48] flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-[#027A48]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Eligible
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Bookmark scheme"
          >
            <svg
              className={`w-5 h-5 ${isBookmarked ? "fill-[#E04F16] text-[#E04F16]" : "fill-none stroke-current"}`}
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Scheme Title */}
        <h3 className="font-heading font-extrabold text-[#101828] text-xl leading-snug mb-1 line-clamp-2 group-hover:text-[#E04F16] transition-colors">
          {scheme.title}
        </h3>

        {/* Department Subtitle */}
        <p className="text-xs text-gray-500 font-medium mb-3">
          {scheme.department}
        </p>

        {/* Short Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-6 font-normal leading-relaxed">
          {scheme.description}
        </p>

        {/* 3 Key Stats Pills */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {/* Stat 1: Benefit */}
          <div className="bg-[#F9FAFB] rounded-xl p-2.5 text-center">
            <p className="font-bold text-xs text-[#101828] truncate">
              {scheme.benefitStat || "₹6,000..."}
            </p>
            <p className="text-[11px] text-gray-400 font-medium">Benefit</p>
          </div>

          {/* Stat 2: Applicants */}
          <div className="bg-[#F9FAFB] rounded-xl p-2.5 text-center">
            <p className="font-bold text-xs text-[#101828] truncate">
              {scheme.applicantsStat || "11.8 Cr..."}
            </p>
            <p className="text-[11px] text-gray-400 font-medium">Applicants</p>
          </div>

          {/* Stat 3: Deadline */}
          <div className="bg-[#F9FAFB] rounded-xl p-2.5 text-center">
            <p className="font-bold text-xs text-[#101828] truncate">
              {scheme.deadlineStat || "Ongoing"}
            </p>
            <p className="text-[11px] text-gray-400 font-medium">Deadline</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <Link
        to={scheme._id ? `/policies/${scheme._id}` : "/policies"}
        className="w-full py-3 px-4 rounded-full border border-transparent bg-[#FFF5EE] text-[#E04F16] font-semibold text-sm hover:bg-[#FFEAE0] text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <span>View Details</span>
        <span className="text-lg font-normal">→</span>
      </Link>
    </div>
  );
}
