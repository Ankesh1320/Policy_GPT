import { LuCheck, LuX } from "react-icons/lu";

export default function EligibilitySection({ scheme }) {
  if (!scheme) return null;

  const items = [];

  // 1. If eligibility is a Mongoose object
  if (scheme.eligibility && typeof scheme.eligibility === "object" && !Array.isArray(scheme.eligibility)) {
    const el = scheme.eligibility;
    
    // Add Age info
    if (el.minAge !== undefined && el.maxAge !== undefined && (el.minAge > 0 || el.maxAge < 100)) {
      items.push({
        title: "Age limit",
        description: `Eligible for ages between ${el.minAge} and ${el.maxAge} years.`,
        valid: true
      });
    }

    // Add Genders info
    if (el.genders && el.genders.length > 0 && !el.genders.includes("Any")) {
      items.push({
        title: "Gender criteria",
        description: `Applicable to: ${el.genders.join(", ")}.`,
        valid: true
      });
    }

    // Add States info
    if (el.states && el.states.length > 0 && !el.states.includes("All India")) {
      items.push({
        title: "State restrictions",
        description: `Only open to residents of: ${el.states.join(", ")}.`,
        valid: true
      });
    }

    // Add Occupations info
    if (el.occupations && el.occupations.length > 0 && !el.occupations.includes("Any")) {
      items.push({
        title: "Occupation category",
        description: `Applicable to: ${el.occupations.join(", ")}.`,
        valid: true
      });
    }

    // Add Education Levels info
    if (el.educationLevels && el.educationLevels.length > 0 && !el.educationLevels.includes("Any")) {
      items.push({
        title: "Education levels",
        description: `Required education level: ${el.educationLevels.join(", ")}.`,
        valid: true
      });
    }

    // Add Income limit
    if (el.annualIncomeMax !== undefined && el.annualIncomeMax > 0) {
      items.push({
        title: "Annual income limit",
        description: `Family income must be below ₹${el.annualIncomeMax.toLocaleString()} per year.`,
        valid: true
      });
    }

    // Add Farmer/Student/Women flags
    if (el.farmerRequired) {
      items.push({
        title: "Farmer status required",
        description: "Applicant must be registered as a farmer.",
        valid: true
      });
    }

    if (el.studentRequired) {
      items.push({
        title: "Student status required",
        description: "Applicant must be actively enrolled as a student.",
        valid: true
      });
    }

    if (el.womenOnly) {
      items.push({
        title: "Women restriction",
        description: "This scheme is open exclusively for women.",
        valid: true
      });
    }

    if (el.disabilityRequired) {
      items.push({
        title: "Disability eligibility",
        description: "Applicants must possess a valid disability certificate.",
        valid: true
      });
    }

    if (el.minorityRequired) {
      items.push({
        title: "Minority community",
        description: "Applicants must belong to a recognized minority community.",
        valid: true
      });
    }
  }

  // 2. If eligibility is an array of strings (from static mock data)
  if (Array.isArray(scheme.eligibility)) {
    scheme.eligibility.forEach((el, index) => {
      items.push({
        title: `Requirement #${index + 1}`,
        description: el,
        valid: true
      });
    });
  }

  // 3. Fallback to raw text eligibilityDetails or eligibilitySummary
  const rawText = scheme.eligibilityDetails || scheme.eligibilitySummary;
  if (rawText && typeof rawText === "string") {
    const rawItems = rawText
      .split(/[\r\n•;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 2);
    
    rawItems.forEach((text) => {
      if (!items.some(it => it.description === text)) {
        items.push({
          title: "Eligibility Requirement",
          description: text,
          valid: true
        });
      }
    });
  }

  // If we still have nothing
  if (items.length === 0) {
    items.push({
      title: "General Criteria",
      description: "Please check the official scheme guidelines for full eligibility requirements.",
      valid: true
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">Eligibility Criteria</h2>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
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
