import { LuCheck } from "react-icons/lu";

const benefits = [
  "Direct income support distributed through verified government accounts.",
  "Helps small and marginal farmers cover agricultural expenses and household needs.",
  "Improves financial stability with predictable quarterly payments.",
  "Supports inclusive growth across rural communities and farming families.",
];

export default function BenefitsSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">Benefits</h2>
        <div className="space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <LuCheck className="h-5 w-5 text-brand-green mt-1" />
              <p className="text-text-body leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
