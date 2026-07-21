import React from "react";
import { Link } from "react-router-dom";

export default function EligibilityHeader() {
  return (
    <div className="bg-white border-b border-border-warm/60 py-6 px-5 sm:px-8 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-sm text-text-secondary font-medium mb-3">
          <Link to="/" className="hover:text-brand-orange transition-colors">
            Home
          </Link>
          <span className="text-text-slate font-normal">&gt;</span>
          <span className="text-text-primary font-semibold">Eligibility Checker</span>
        </nav>

        {/* Page Title */}
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-heading tracking-tight">
          Eligibility Checker
        </h1>

        {/* Subtitle */}
        <p className="mt-2 font-body text-base sm:text-lg text-text-secondary font-normal max-w-3xl">
          Answer a few simple questions to instantly discover government schemes you're eligible for.
        </p>
      </div>
    </div>
  );
}
