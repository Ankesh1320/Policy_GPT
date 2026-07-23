import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../../assets/images/about.png';
import breadcrumbChevron from '../../assets/icons/policies/breadcrumb-chevron.svg';

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border-header">
      {/* Background Image Setup to exactly match the look in the mockup */}
      <div className="absolute inset-0 bg-white" />
      <img
        src={aboutImage}
        alt="PolicyGPT Mission background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-35 scale-100"
      />
      <div className="absolute inset-0 hero-gradient-overlay" />
      
      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-10 lg:px-20 lg:py-12 flex flex-col items-center text-center">
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
            About
          </span>
        </nav>
        
        <h1 className="font-heading text-[30px] font-bold leading-9 tracking-[-0.0367em] text-[#0F172A]">
          Our Mission
        </h1>
        
        <p className="mt-2 max-w-[760px] font-body text-base font-medium leading-6 text-text-body">
          PolicyGPT exists to make India's vast government ecosystem accessible, understandable, and actionable for every citizen, regardless of education, language, or location.
        </p>
      </div>
    </section>
  );
}
