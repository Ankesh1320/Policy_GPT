export default function OverviewSection({ scheme }) {
  if (!scheme) return null;
  
  const objective = scheme.objective || "";
  const description = scheme.description || scheme.overview || "";

  return (
    <div className="space-y-6">
      {objective && (
        <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-slate-heading mb-3">Objective</h2>
          <p className="text-text-body leading-relaxed whitespace-pre-line">
            {objective}
          </p>
        </div>
      )}

      {description && (
        <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-slate-heading mb-3">Description</h2>
          <p className="text-text-body leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
