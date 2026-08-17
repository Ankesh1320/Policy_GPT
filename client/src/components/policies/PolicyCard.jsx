import { Link } from "react-router-dom";
import calendarIcon from "../../assets/icons/policies/calendar-icon.svg";
import readIcon from "../../assets/icons/policies/read-icon.svg";
import pdfIcon from "../../assets/icons/policies/pdf-icon.svg";

const categoryStyles = {
  orange: "bg-card-orange text-brand-orange",
  green: "bg-badge-green-bg text-brand-green",
  greenEmployment: "bg-badge-green-bg text-badge-green-text",
};

function BookmarkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PolicyCard({ policy }) {
  const badgeClass = categoryStyles[policy.categoryVariant] || categoryStyles.orange;
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const canSavePolicy = !currentUser || currentUser.role === "citizen";

  return (
    <article className="relative flex flex-col rounded-[20px] border border-border-warm bg-white p-[17px] pb-5">
      {canSavePolicy && (
        <button
          type="button"
          className="absolute right-[17px] top-[33px] rounded p-0 transition-opacity hover:opacity-70"
          aria-label={`Bookmark ${policy.title}`}
        >
          <BookmarkIcon />
        </button>
      )}

      <span
        className={`inline-flex h-[25px] w-fit items-center justify-center rounded-[30px] px-3 font-body text-sm font-medium leading-none ${badgeClass}`}
      >
        {policy.category}
      </span>

      <h3 className="mt-5 pr-8 font-heading text-lg font-bold leading-[26px] text-slate-heading">
        {policy.title}
      </h3>

      <p className="mt-1 font-body text-sm font-medium leading-[21px] text-text-secondary">
        {policy.department}
      </p>

      <div className="mt-3 flex items-center gap-1.5 pt-1.5">
        <img src={calendarIcon} alt="" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="font-body text-[13px] leading-[19.5px] text-text-slate">
          Published {policy.published}
        </span>
      </div>

      <div className="mt-auto flex items-center gap-3 pt-6">
        <Link
          to={`/policies/${policy.id}`}
          className="group inline-flex h-[43px] min-w-[128px] items-center justify-center gap-2 rounded-full border border-transparent bg-card-orange px-5 font-body text-sm font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
        >
          <img
            src={readIcon}
            alt=""
            className="h-4 w-4 shrink-0 transition-colors group-hover:brightness-0 group-hover:invert"
            aria-hidden="true"
          />
          Read
        </Link>

        <a
          href={policy.pdf}
          className="inline-flex h-[43px] min-w-[128px] items-center justify-center gap-2 rounded-full border border-border-light bg-white px-5 font-body text-sm font-normal text-slate-muted transition-colors hover:border-brand-orange hover:text-brand-orange"
        >
          <img src={pdfIcon} alt="" className="h-4 w-4 shrink-0" aria-hidden="true" />
          PDF
        </a>
      </div>
    </article>
  );
}
