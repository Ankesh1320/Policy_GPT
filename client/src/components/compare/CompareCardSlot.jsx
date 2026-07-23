import React from "react";
import { Link } from "react-router-dom";

export default function CompareCardSlot({
  scheme,
  isEmpty,
  canRemove,
  onRemove,
  onOpenAddModal,
}) {
  if (isEmpty) {
    return (
      <div className="h-full min-h-[160px] rounded-3xl border-2 border-dashed border-border-warm bg-cream/30 p-6 flex flex-col items-center justify-center text-center group hover:border-brand-orange hover:bg-card-orange/40 transition-all cursor-pointer"
        onClick={onOpenAddModal}
      >
        <div className="w-12 h-12 rounded-full bg-white border border-border-warm flex items-center justify-center text-brand-orange font-bold text-xl mb-2 group-hover:scale-110 transition-transform shadow-sm">
          +
        </div>
        <p className="font-heading text-sm font-bold text-slate-heading group-hover:text-brand-orange transition-colors">
          Add Scheme to Compare
        </p>
        <p className="font-body text-xs text-text-secondary mt-1">
          Select from 2,400+ indexed government schemes
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[160px] rounded-3xl border border-border-warm bg-white p-6 shadow-soft flex flex-col justify-between group hover:shadow-card transition-all">
      {/* Top Tag & Remove Button */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="inline-block px-3 py-1 rounded-full bg-card-orange text-brand-orange font-heading text-xs font-semibold">
          {scheme.category}
        </span>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(scheme.id)}
            className="w-7 h-7 rounded-full bg-gray-100 text-text-muted hover:bg-red-50 hover:text-red-600 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
            aria-label="Remove scheme"
          >
            ✕
          </button>
        )}
      </div>

      {/* Scheme Title & Ministry */}
      <div>
        <h3 className="font-heading font-extrabold text-slate-heading text-lg sm:text-xl leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
          {scheme.title}
        </h3>
        <p className="font-body text-xs text-text-secondary font-medium mt-1 line-clamp-1">
          {scheme.department}
        </p>
      </div>

      {/* Action details link */}
      <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between">
        <span className="font-body text-xs text-brand-green font-bold flex items-center gap-1">
          ✓ Verified Active
        </span>
        <Link
          to={`/policies/${scheme.id}`}
          className="font-heading text-xs font-semibold text-brand-orange hover:underline"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}
