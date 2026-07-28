import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import SchemeCard from "../components/ui/SchemeCard";
import PolicyFilter from "../components/policies/PolicyFilter";
import SchemeSearch from "../components/schemes/SchemeSearch";
import schemesData, {
  filterCategories,
  filterEligibility,
  sortOptions,
  stateOptions,
} from "../data/schemesData";
import breadcrumbChevron from "../assets/icons/policies/breadcrumb-chevron.svg";
import sortDropdownArrow from "../assets/icons/policies/sort-dropdown-arrow.svg";
import Sidebar from "../components/navbar/sidebar";
import DashboardNavbar from "../components/navbar/navbar";
import AuthBlocker from "../components/auth/AuthBlocker";

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

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEligibility, setSelectedEligibility] = useState(["Open for All"]);
  const [selectedState, setSelectedState] = useState("All India (Central)");
  const [sortBy, setSortBy] = useState("Popular");
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const token = localStorage.getItem("token");

  const filteredSchemes = useMemo(() => {
    let results = [...schemesData];
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      results = results.filter(
        (scheme) =>
          scheme.title.toLowerCase().includes(query) ||
          scheme.ministry.toLowerCase().includes(query) ||
          scheme.description.toLowerCase().includes(query) ||
          scheme.category.toLowerCase().includes(query),
      );
    }

    if (selectedCategory !== "All") {
      results = results.filter((scheme) => scheme.category === selectedCategory);
    }

    if (selectedEligibility.length > 0) {
      results = results.filter((scheme) =>
        scheme.eligibility.some((item) => selectedEligibility.includes(item)),
      );
    }

    if (sortBy === "A-Z") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Oldest") {
      results.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "Newest") {
      results.sort((a, b) => a.popularity - b.popularity);
    } else {
      results.sort((a, b) => a.popularity - b.popularity);
    }

    return results;
  }, [searchQuery, selectedCategory, selectedEligibility, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedEligibility(["Open for All"]);
    setSelectedState("All India (Central)");
    setSortBy("Popular");
  };

  if (token) {
    return (
      <div className="h-screen flex overflow-hidden bg-[#FDF9F2] font-body">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardNavbar
            onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          />
          <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8 flex flex-col gap-6">
            <section className="bg-white rounded-[24px] p-6 border border-border-light shadow-sm">
              <nav className="mb-4 flex items-center gap-3" aria-label="Breadcrumb">
                <Link
                  to="/"
                  className="font-body text-sm leading-5 text-text-body transition-colors hover:text-brand-orange"
                >
                  Home
                </Link>
                <img src={breadcrumbChevron} alt="" className="h-3 w-2" aria-hidden="true" />
                <span className="font-body text-sm font-semibold leading-5 text-slate-heading">
                  Explore Schemes
                </span>
              </nav>

              <h1 className="font-heading text-[30px] font-bold leading-9 tracking-[-0.0367em] text-[#0F172A]">
                Explore Government Schemes
              </h1>
              <p className="mt-2 max-w-xl font-body text-base font-medium leading-6 text-text-body">
                Browse 2,400+ welfare schemes from Central and State governments.
              </p>

              <div className="mt-6">
                <SchemeSearch value={searchQuery} onChange={setSearchQuery} />
              </div>
            </section>

            <div className="bg-cream p-6 rounded-[24px] border border-border-warm flex flex-col gap-8 lg:flex-row lg:gap-6 xl:gap-10">
              <PolicyFilter
                categories={filterCategories}
                eligibilityOptions={filterEligibility}
                states={stateOptions}
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
                    <span className="font-bold text-slate-heading">{filteredSchemes.length}</span>{" "}
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

                {filteredSchemes.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredSchemes.map((scheme) => (
                      <SchemeCard key={scheme.id} scheme={scheme} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[20px] border border-border-warm bg-white px-6 py-16 text-center">
                    <p className="font-heading text-lg font-bold text-slate-heading">No schemes found</p>
                    <p className="mt-2 font-body text-sm text-text-secondary">
                      Try adjusting your filters or reset them to see all schemes.
                    </p>
                  </div>
                )}

                {filteredSchemes.length > 0 && <Pagination />}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-warm flex flex-col justify-between">
      <div>
        <Navbar activeLabel="Explore Schemes" />

        <div className="relative">
          <div className={!token ? "blur-[6px] pointer-events-none select-none" : ""}>
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
                  <span className="font-body text-sm font-semibold leading-5 text-slate-heading">
                    Explore Schemes
                  </span>
                </nav>

                <h1 className="font-heading text-[30px] font-bold leading-9 tracking-[-0.0367em] text-[#0F172A]">
                  Explore Government Schemes
                </h1>
                <p className="mt-2 max-w-xl font-body text-base font-medium leading-6 text-text-body">
                  Browse 2,400+ welfare schemes from Central and State governments.
                </p>

                <div className="mt-6">
                  <SchemeSearch value={searchQuery} onChange={setSearchQuery} />
                </div>
              </div>
            </section>

            <main className="bg-cream">
              <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-20">
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-6 xl:gap-10">
                  <PolicyFilter
                    categories={filterCategories}
                    eligibilityOptions={filterEligibility}
                    states={stateOptions}
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
                        <span className="font-bold text-slate-heading">{filteredSchemes.length}</span>{" "}
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

                    {filteredSchemes.length > 0 ? (
                      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredSchemes.map((scheme) => (
                          <SchemeCard key={scheme.id} scheme={scheme} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-[20px] border border-border-warm bg-white px-6 py-16 text-center">
                        <p className="font-heading text-lg font-bold text-slate-heading">No schemes found</p>
                        <p className="mt-2 font-body text-sm text-text-secondary">
                          Try adjusting your filters or reset them to see all schemes.
                        </p>
                      </div>
                    )}

                    {filteredSchemes.length > 0 && <Pagination />}
                  </div>
                </div>
              </div>
            </main>
          </div>

          {!token && <AuthBlocker pageName="Explore Schemes" />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
