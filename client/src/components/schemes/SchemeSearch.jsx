function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SchemeSearch({ value, onChange }) {
  return (
    <div className="relative w-full max-w-[600px]">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by scheme name, department, keyword..."
        className="h-12 w-full rounded-xl border border-border-warm bg-cream py-3 pl-12 pr-4 font-body text-base text-text-primary placeholder:text-text-slate focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
        aria-label="Search schemes"
      />
    </div>
  );
}
