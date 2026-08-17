import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/images/hero-img.png';
import { heroStats, popularTags } from '../../data/landingData';
import StatCard from '../ui/StatCard';
import Button from '../ui/Button';
import arrowIcon from '../../assets/icons/line-md_arrow-right.svg';

const TAG_ROUTE_MAP = {
  'PM Kisan': '/schemes/1',
  'Ayushman Bharat': '/schemes/2',
  'Scholarships': '/schemes/5',
  'MUDRA Loan': '/schemes/6',
  'PM Awas': '/schemes/3',
};

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      navigate('/schemes');
      return;
    }

    navigate(`/schemes?search=${encodeURIComponent(trimmed)}`);
  };

  const handleTagClick = (tag) => {
    const route = TAG_ROUTE_MAP[tag] || '/schemes';
    navigate(route);
  };

  return (
    <section className="relative flex flex-col overflow-hidden pb-8 lg:pb-10">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="hero-gradient-overlay absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6 lg:px-20 lg:pb-6 lg:pt-10">
        <div className="mx-auto flex w-full max-w-[990px] flex-col items-center text-center">
          {/* Top content — compact so stats stay in view */}
          <div className="flex flex-col items-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-[50px] bg-white px-5 py-2.5 shadow-card sm:px-6 sm:py-3">
              <span
                className="animate-breathing-dot h-[13px] w-[13px] shrink-0 rounded-full"
                aria-hidden="true"
              />
              <p className="font-heading text-xs font-medium text-text-secondary sm:text-sm lg:text-base">
                2,400+ Government Schemes Now Available · Updated Daily
              </p>
            </div>

            <h1 className="mb-3 font-heading text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.15] text-heading-dark lg:mb-4">
              Discover Government
              <br />
              <span className="text-gradient-brand">Schemes & Policies</span>
              <br />
              <span className="text-brand-orange">Made Simple.</span>
            </h1>

            <p className="mb-5 max-w-[743px] font-heading text-sm font-semibold leading-6 text-heading-charcoal sm:text-base lg:mb-6 lg:text-lg lg:leading-7">
              India&apos;s most comprehensive AI-powered platform to find, understand, compare, and
              apply for government welfare schemes and policies — in plain language.
            </p>

            <div className="mb-3 flex w-full max-w-[708px] flex-row items-center rounded-[16px] bg-white p-2 shadow-card sm:mb-4 sm:rounded-[20px]">
              <label className="relative flex min-w-0 flex-1 items-center">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  placeholder="Search schemes..."
                  className="w-full bg-transparent pl-11 pr-2 py-2.5 font-body text-sm text-text-placeholder outline-none placeholder:text-text-placeholder sm:placeholder:content-['Search_schemes,_policies,_departments...'] sm:text-base"
                />
              </label>
              <Button
                variant="search"
                size="sm"
                onClick={handleSearch}
                icon={<img src={arrowIcon} alt="" className="h-4 w-4" aria-hidden="true" />}
                className="shrink-0 !py-2.5 !px-3 sm:!px-6"
              >
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="font-body text-sm font-semibold text-text-heading sm:text-base">
                Popular:
              </span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="rounded-[30px] bg-white px-3 py-1 font-body text-sm font-medium text-text-secondary transition-colors hover:text-brand-orange sm:px-4 sm:py-1.5 sm:text-base"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stat cards pinned toward bottom of hero */}
          <div className="mt-8 w-full lg:mt-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-6">
              {heroStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
