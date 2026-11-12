import { LuCheck } from "react-icons/lu";

export default function BenefitsSection({ scheme }) {
  if (!scheme) return null;

  const items = Array.isArray(scheme.benefits)
    ? scheme.benefits
    : (typeof scheme.benefits === "string"
        ? scheme.benefits
            .split(/[\r\n•;]+/)
            .map((s) => s.trim())
            .filter((s) => s.length > 2)
        : []);

  const benefitsList = items.length > 0 ? items : [
    "Predictable financial support distributed through official government channels.",
    "Promotes inclusive social and economic development for eligible citizens.",
    "Ensures direct benefit transfers without middleman interference."
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">Benefits</h2>
        <div className="space-y-4">
          {benefitsList.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <LuCheck className="h-5 w-5 text-brand-green mt-1" />
              <p className="text-text-body leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
