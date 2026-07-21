import React from "react";
import { Link } from "react-router-dom";

export default function CompareTableMatrix({ selectedSchemes }) {
  const scheme1 = selectedSchemes[0] || {};
  const scheme2 = selectedSchemes[1] || {};

  const rows = [
    {
      label: "Department",
      val1: scheme1.shortDepartment || scheme1.department,
      val2: scheme2.shortDepartment || scheme2.department,
    },
    {
      label: "Annual Benefit",
      val1: scheme1.annualBenefit || scheme1.financial?.maxBenefit,
      val2: scheme2.annualBenefit || scheme2.financial?.maxBenefit,
    },
    {
      label: "Beneficiaries",
      val1: scheme1.beneficiaries || scheme1.overview?.targetBeneficiary,
      val2: scheme2.beneficiaries || scheme2.overview?.targetBeneficiary,
    },
    {
      label: "Eligibility",
      val1: scheme1.eligibilitySummary || scheme1.eligibility?.occupation,
      val2: scheme2.eligibilitySummary || scheme2.eligibility?.occupation,
    },
    {
      label: "Application Mode",
      val1: scheme1.applicationModeSummary || scheme1.application?.applicationMode,
      val2: scheme2.applicationModeSummary || scheme2.application?.applicationMode,
    },
    {
      label: "Documents Required",
      val1: scheme1.documentsSummary || (scheme1.application?.documents ? scheme1.application.documents.join(", ") : "Aadhaar, Land records"),
      val2: scheme2.documentsSummary || (scheme2.application?.documents ? scheme2.application.documents.join(", ") : "Aadhaar, Ration card"),
    },
    {
      label: "Deadline",
      val1: scheme1.deadline || "Ongoing",
      val2: scheme2.deadline || "Ongoing",
    },
    {
      label: "Eligible for You",
      val1: scheme1.eligibleForYou !== false ? (
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#16A34A]">
          <svg className="w-4 h-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#EF4444]">
          <svg className="w-4 h-4 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          No
        </span>
      ),
      val2: scheme2.eligibleForYou !== false ? (
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#16A34A]">
          <svg className="w-4 h-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#EF4444]">
          <svg className="w-4 h-4 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          No
        </span>
      ),
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      {/* Featured Comparision Section Title */}
      <h2 className="font-heading font-extrabold text-[#101828] text-xl sm:text-2xl mb-4 tracking-tight">
        Featured Scheme Comparision
      </h2>

      {/* Main Rounded Matrix Container */}
      <div className="bg-white rounded-[28px] border border-gray-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            {/* Header Row */}
            <thead>
              <tr className="border-b border-gray-100">
                {/* Features Column Header */}
                <th className="w-1/3 min-w-[200px] p-6 font-heading text-xs font-bold text-[#475467] tracking-wider uppercase bg-white">
                  FEATURES
                </th>

                {/* Scheme 1 Header */}
                <th className="w-1/3 min-w-[240px] p-6 bg-[#ECFDF5] border-r border-gray-100">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#FFF3EA] text-[#E04F16] mb-2">
                    {scheme1.badgeTag || "POPULAR"}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#16A34A] leading-snug">
                    {scheme1.title}
                  </h3>
                </th>

                {/* Scheme 2 Header */}
                <th className="w-1/3 min-w-[240px] p-6 bg-[#EEF2FF]">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#FFF3EA] text-[#E04F16] mb-2">
                    {scheme2.badgeTag || "FEATURED"}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#1E40AF] leading-snug">
                    {scheme2.title}
                  </h3>
                </th>
              </tr>
            </thead>

            {/* Matrix Body Rows */}
            <tbody>
              {rows.map((row, idx) => {
                const isWarmRow = idx % 2 === 0;

                return (
                  <tr
                    key={row.label}
                    className={`border-b border-gray-100 transition-colors ${
                      isWarmRow ? "bg-[#FAF5E4]/60" : "bg-white"
                    }`}
                  >
                    {/* Feature Name */}
                    <td className="p-5 font-heading text-sm font-semibold text-gray-700">
                      {row.label}
                    </td>

                    {/* Scheme 1 Value */}
                    <td className="p-5 font-body text-sm font-medium text-gray-800 border-r border-gray-100/50">
                      {row.val1}
                    </td>

                    {/* Scheme 2 Value */}
                    <td className="p-5 font-body text-sm font-medium text-gray-800">
                      {row.val2}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom View Details Action Buttons Row */}
        <div className="bg-[#FAF5E4]/80 p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="hidden md:block"></div>

          {/* Scheme 1 View Details Button */}
          <div>
            <Link
              to={scheme1.id ? `/policies/${scheme1.id}` : "/policies"}
              className="w-full bg-[#ECFDF5] text-[#16A34A] font-semibold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#D1FAE5] transition-colors cursor-pointer shadow-xs"
            >
              <span>View Details</span>
              <span className="text-base">›</span>
            </Link>
          </div>

          {/* Scheme 2 View Details Button */}
          <div>
            <Link
              to={scheme2.id ? `/policies/${scheme2.id}` : "/policies"}
              className="w-full bg-[#EEF2FF] text-[#1E40AF] font-semibold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#E0E7FF] transition-colors cursor-pointer shadow-xs"
            >
              <span>View Details</span>
              <span className="text-base">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
