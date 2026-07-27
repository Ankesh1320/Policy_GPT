import { LuCheck, LuX } from "react-icons/lu";

const eligibilityItems = [
  {
    title: "Land Ownership",
    description: "Must own cultivable agricultural land (individual or jointly).",
    valid: true,
  },
  {
    title: "Indian Citizen",
    description: "Applicant must be an Indian citizen with a valid Aadhaar card.",
    valid: true,
  },
  {
    title: "Income Limit",
    description: "No upper income limit for landholding farmers.",
    valid: true,
  },
  {
    title: "Excludes Institutional Landholders",
    description: "Corporations and companies are not eligible.",
    valid: false,
  },
  {
    title: "Excludes Government Employees",
    description: "Current and former Central/State government employees are not eligible.",
    valid: false,
  },
];

export default function EligibilitySection() {
  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">Eligibility Criteria</h2>
        <div className="space-y-3">
          {eligibilityItems.map((item) => (
            <div
              key={item.title}
              className={`rounded-3xl border p-5 ${item.valid ? "border-[#d1fae5] bg-[#ecfdf5]" : "border-[#fee2e2] bg-[#fef2f2]"}`}
            >
              <div className="flex items-start gap-3">
                {item.valid ? (
                  <LuCheck className="h-5 w-5 text-brand-green mt-0.5" />
                ) : (
                  <LuX className="h-5 w-5 text-[#ef4444] mt-0.5" />
                )}
                <div>
                  <h3 className="font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-body mt-1">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
