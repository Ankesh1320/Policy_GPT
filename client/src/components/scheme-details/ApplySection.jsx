import { LuExternalLink } from "react-icons/lu";

export default function ApplySection({ scheme }) {
  if (!scheme) return null;
  const applyProcess = scheme.apply || scheme.applicationProcess || "Apply on the official portal.";
  const items = typeof applyProcess === "string"
    ? applyProcess
        .split(/[\r\n•]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2)
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">How to Apply</h2>
        {items.length > 0 ? (
          <ul className="space-y-3 list-disc pl-5 text-text-body mb-6">
            {items.map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ul>
        ) : (
          <p className="text-text-body leading-relaxed whitespace-pre-line mb-6">
            {applyProcess}
          </p>
        )}
        
        {scheme.applicationUrl && scheme.applicationUrl !== "#" && (
          <a
            href={scheme.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit bg-btn-yellow hover:bg-brand-orange transition-colors text-slate-heading hover:text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-2 shadow-btn text-sm"
          >
            <LuExternalLink className="h-4 w-4" />
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
}
