import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import PolicyCard from "../components/policies/PolicyCard";
import PolicyFilter from "../components/policies/PolicyFilter";
import policiesData, { sortOptions } from "../data/policiesData";
import breadcrumbChevron from "../assets/icons/policies/breadcrumb-chevron.svg";
import sortDropdownArrow from "../assets/icons/policies/sort-dropdown-arrow.svg";

const categoryMap = {
  Healthcare: "Healthcare",
  Housing: "Housing",
  Education: "Education",
  "Women Welfare": "Women Welfare",
  "Financial Aid": "Financial Aid",
  Employment: "Employment",
  Agriculture: "Agriculture",
};

function Pagination() {
  const pages = [
    { label: "1", active: true },
    { label: "2", active: false },
    { label: "...", active: false, disabled: true },
    { label: "3", active: false },
    { label: "24", active: false },
  ];

  return (
    <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
      {pages.map((page) => {
        if (page.label === "...") {
          return (
            <span key="ellipsis" className="font-body text-xl font-bold leading-7 text-text-body">
              ...
            </span>
          );
        }

        return (
          <button
            key={page.label}
            type="button"
            disabled={page.disabled}
            className={`flex h-9 w-9 items-center justify-center rounded-full font-body text-sm font-semibold transition-colors ${
              page.active
                ? "bg-brand-orange text-white"
                : "border border-[#CBD5E1] bg-white text-text-body hover:border-brand-orange hover:text-brand-orange"
            }`}
            aria-current={page.active ? "page" : undefined}
          >
            {page.label}
          </button>
        );
      })}
    </nav>
  );
}

export default function PoliciesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEligibility, setSelectedEligibility] = useState(["Open for All"]);
  const [selectedState, setSelectedState] = useState("All India (Central)");
  const [sortBy, setSortBy] = useState("Popular");

  const filteredPolicies = useMemo(() => {
    let results = [...policiesData];

    if (selectedCategory !== "All") {
      const mappedCategory = categoryMap[selectedCategory] || selectedCategory;
      results = results.filter((policy) => policy.category === mappedCategory);
    }

    if (selectedEligibility.length > 0) {
      results = results.filter((policy) =>
        policy.eligibility.some((item) => selectedEligibility.includes(item)),
      );
    }

    if (sortBy === "A-Z") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Oldest") {
      results.sort((a, b) => a.published.localeCompare(b.published));
    } else if (sortBy === "Newest") {
      results.sort((a, b) => b.published.localeCompare(a.published));
    }

    return results;
  }, [selectedCategory, selectedEligibility, sortBy]);

  const handleReset = () => {
    setSelectedCategory("All");
    setSelectedEligibility(["Open for All"]);
    setSelectedState("All India (Central)");
    setSortBy("Popular");
  };

  return (
    <div className="min-h-screen bg-page-warm">
      <Navbar activeLabel="Policies" />

      <section className="border-b border-border-header bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-20 lg:py-12">
          <nav className="mb-4 flex items-center gap-3" aria-label="Breadcrumb">
            <Link
              to="/"
              className="font-body text-sm leading-5 text-text-body transition-colors hover:text-brand-orange"
            >
              Home
            </Link>
            <img src={breadcrumbChevron} alt="" className="h-3 w-2" aria-hidden="true" />
            <span className="font-body text-sm font-semibold leading-5 text-slate-heading">Policies</span>
          </nav>

          <h1 className="font-heading text-[30px] font-bold leading-9 tracking-[-0.0367em] text-[#0F172A]">
            Government Policies
          </h1>
          <p className="mt-2 max-w-xl font-body text-base font-medium leading-6 text-text-body">
            Explore 850+ official government policies in plain language.
          </p>
        </div>
      </section>

      <main className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-6 xl:gap-10">
            <PolicyFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedEligibility={selectedEligibility}
              onEligibilityChange={setSelectedEligibility}
              selectedState={selectedState}
              onStateChange={setSelectedState}
              onReset={handleReset}
            />

            <div className="min-w-0 flex-1">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-body text-sm text-text-body">
                  Showing{" "}
                  <span className="font-bold text-slate-heading">{filteredPolicies.length}</span>{" "}
                  schemes
                </p>

                <div className="flex items-center gap-3">
                  <span className="font-body text-sm font-medium text-text-body">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="h-7 min-w-[107px] appearance-none rounded-full border border-[#CBD5E1] bg-white py-0 pl-3 pr-8 font-body text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <img
                      src={sortDropdownArrow}
                      alt=""
                      className="pointer-events-none absolute right-3 top-1/2 h-[6px] w-3 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {filteredPolicies.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredPolicies.map((policy) => (
                    <PolicyCard key={policy.id} policy={policy} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[20px] border border-border-warm bg-white px-6 py-16 text-center">
                  <p className="font-heading text-lg font-bold text-slate-heading">No policies found</p>
                  <p className="mt-2 font-body text-sm text-text-secondary">
                    Try adjusting your filters or reset them to see all policies.
                  </p>
                </div>
              )}

              {filteredPolicies.length > 0 && <Pagination />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
