import greenTick from '../../assets/icons/green-tick.svg';

function BookmarkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-text-secondary"
      aria-hidden="true"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function SchemeBadge({ label, type }) {
  const styles = {
    popular: 'bg-card-orange/35 text-brand-orange',
    new: 'bg-[#E3F3FF] text-brand-blue-dark',
    eligible: 'bg-card-green text-brand-green',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[30px] px-3 py-1 font-body text-sm font-medium ${styles[type] || styles.popular}`}
    >
      {type === 'eligible' && (
        <img src={greenTick} alt="" className="h-2.5 w-2.5" aria-hidden="true" />
      )}
      {label}
    </span>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="flex w-full min-h-[72px] flex-col items-center justify-center rounded-[24px] bg-cream px-4 py-3 text-center sm:px-5">
      <span className="font-body text-[11px] uppercase tracking-[0.08em] text-text-secondary">
        {label}
      </span>
      <span className="mt-1 font-body text-sm font-semibold text-text-primary leading-tight">
        {value}
      </span>
    </div>
  );
}

export default function SchemeCard({ scheme }) {
  const { ministry, title, description, badges, benefit, applicants, deadline } = scheme;

  return (
    <article className="group flex flex-col rounded-[20px] border border-border-warm bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <SchemeBadge key={badge.label} label={badge.label} type={badge.type} />
          ))}
        </div>
        <button
          type="button"
          className="shrink-0 rounded p-1 transition-colors hover:bg-gray-100"
          aria-label={`Bookmark ${title}`}
        >
          <BookmarkIcon />
        </button>
      </div>

      <p className="mb-1 font-body text-sm font-medium text-text-secondary line-clamp-2">
        {ministry}
      </p>
      <h3 className="mb-3 font-heading text-xl font-bold text-text-primary">{title}</h3>
      <p className="mb-4 font-body text-base leading-snug text-text-secondary line-clamp-2">
        {description}
      </p>

      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <StatPill label="Benefit" value={benefit} />
        <StatPill label="Applicants" value={applicants} />
        <StatPill label="Deadline" value={deadline} />
      </div>

      <button
        type="button"
        className="mt-auto w-full rounded-[30px] bg-card-orange py-2.5 text-center font-body text-base font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
      >
        View Details &gt;
      </button>
    </article>
  );
}
