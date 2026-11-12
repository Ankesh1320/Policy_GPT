import { categoryBadgeStyles } from '../../data/landingData';

export default function UpdateCard({ update }) {
  const { category, categoryType, date, title, description, dotColor } = update;
  const badgeClass = categoryBadgeStyles[categoryType];

  return (
    <article className="relative flex flex-col rounded-[20px] border border-border-warm bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${dotColor}`}
          aria-hidden="true"
        />

        <span
          className={`rounded-[30px] px-4 py-1 font-body text-sm font-medium ${badgeClass}`}
        >
          {category}
        </span>

        <span className="font-body text-sm font-medium text-text-secondary">
          {date}
        </span>
      </div>
      <h3 className="mb-3 font-heading text-xl font-bold leading-snug text-text-primary">
        {title}
      </h3>
      <p className="mb-6 flex-1 font-body text-base leading-snug text-text-secondary">
        {description}
      </p>
      <button
        type="button"
        className="self-start font-heading text-base font-medium text-brand-blue transition-colors hover:text-brand-blue-dark"
      >
        Read more &gt;
      </button>
    </article>
  );
}
