import React from "react";
import { Link } from "react-router-dom";
import breadcrumbChevron from "../../assets/icons/policies/breadcrumb-chevron.svg";

export default function EligibilityHeader() {
  return (
    <section className="border-b border-border-header bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-20 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-3" aria-label="Breadcrumb">
          <Link
            to="/"
            className="font-body text-sm leading-5 text-text-body transition-colors hover:text-brand-orange"
          >
            Home
          </Link>
          <img src={breadcrumbChevron} alt="" className="h-3 w-2" aria-hidden="true" />
          <span className="font-body text-sm font-semibold leading-5 text-slate-heading">
            Eligibility Checker
          </span>
        </nav>

        {/* Page Title */}
        <h1 className="font-heading text-[30px] font-bold leading-9 tracking-[-0.0367em] text-[#0F172A]">
          Eligibility Checker
        </h1>

        {/* Subtitle */}
        <p className="mt-2 font-body text-base font-medium leading-6 text-text-body">
          Answer a few simple questions to instantly discover government schemes you're eligible for.
        </p>
      </div>
    </section>
  );
}

