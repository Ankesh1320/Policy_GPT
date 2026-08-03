import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import greenTick from '../../assets/icons/green-tick.svg';
import { schemeService } from "../../services/schemeService";

function BookmarkIcon({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-brand-orange" : "text-text-secondary"}
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

function StatPill({ label, value, fullValue }) {
  return (
    <div 
      title={fullValue || value}
      className="flex w-full min-h-[68px] flex-col items-center justify-center rounded-[16px] bg-cream px-2 py-2 text-center sm:min-h-[76px] sm:rounded-[24px] sm:px-3 sm:py-3 cursor-help hover:bg-orange-50 transition-colors"
    >
      <span className="font-body text-[9px] uppercase tracking-[0.08em] text-[#64748B] sm:text-[10px]">
        {label}
      </span>
      <span className="mt-0.5 font-body text-xs font-semibold text-text-primary leading-tight sm:mt-1 sm:text-[13px] line-clamp-2">
        {value}
      </span>
    </div>
  );
}

export default function SchemeCard({ scheme }) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { ministry, title, description, badges, benefit, applicants, deadline, id } = scheme;

  useEffect(() => {
    const checkSaved = async () => {
      if (id && id.toString().length === 24) {
        try {
          const saved = await schemeService.isSaved(id);
          setIsBookmarked(saved);
        } catch (err) {
          console.warn("Failed to check saved status:", err.message);
        }
      }
    };
    checkSaved();
  }, [id]);

  const handleToggleBookmark = async (e) => {
    e.stopPropagation();
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);

    if (id && id.toString().length === 24) {
      try {
        if (nextState) {
          await schemeService.save(id);
        } else {
          await schemeService.unsave(id);
        }
      } catch (err) {
        console.error("Failed to toggle bookmark:", err.message);
        setIsBookmarked(!nextState); // Revert state
      }
    }
  };

  const truncateValue = (val, max = 22) => {
    if (!val) return "N/A";
    return val.length > max ? val.substring(0, max - 3) + "..." : val;
  };

  return (
    <article className="group flex flex-col rounded-[16px] border border-border-warm bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:rounded-[20px] sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <SchemeBadge key={badge.label} label={badge.label} type={badge.type} />
          ))}
        </div>
        <button
          type="button"
          onClick={handleToggleBookmark}
          className="shrink-0 rounded p-1 transition-colors hover:bg-gray-100"
          aria-label={`Bookmark ${title}`}
        >
          <BookmarkIcon filled={isBookmarked} />
        </button>
      </div>

      <p className="mb-1 font-body text-sm font-medium text-text-secondary line-clamp-1">
        {ministry}
      </p>
      <h3 className="mb-2 font-heading text-base font-bold text-text-primary line-clamp-2 sm:text-lg min-h-[44px]">{title}</h3>
      <p className="mb-4 font-body text-xs leading-relaxed text-text-secondary line-clamp-2 sm:text-sm">
        {description}
      </p>

      <div className="mb-4 grid grid-cols-3 gap-1.5">
        <StatPill label="Benefit" value={truncateValue(benefit)} fullValue={benefit} />
        <StatPill label="Applicants" value={truncateValue(applicants)} fullValue={applicants} />
        <StatPill label="Deadline" value={truncateValue(deadline)} fullValue={deadline} />
      </div>

      <button
        type="button"
        onClick={() => navigate(`/schemes/${scheme.id}`)}
        className="mt-auto inline-flex w-full items-center justify-center rounded-[30px] bg-card-orange py-2 text-center font-body text-sm font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white sm:text-base"
      >
        View Details &gt;
      </button>
    </article>
  );
}
