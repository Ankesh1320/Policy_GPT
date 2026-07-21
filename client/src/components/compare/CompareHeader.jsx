import React from "react";
import { Link } from "react-router-dom";

export default function CompareHeader() {
  return (
    <div className="bg-white border-b border-gray-100 py-6 px-5 sm:px-8 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-3">
          <Link to="/" className="hover:text-[#FD7A08] transition-colors">
            Home
          </Link>
          <span className="text-gray-400 font-normal">&gt;</span>
          <span className="text-gray-900 font-semibold">Compare Schemes</span>
        </nav>

        {/* Title & Subtitle */}
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight">
          Compare Schemes
        </h1>
        <p className="mt-1 font-body text-sm sm:text-base text-gray-500 font-normal">
          Side-by-side comparison to help you make the right choice.
        </p>
      </div>
    </div>
  );
}
