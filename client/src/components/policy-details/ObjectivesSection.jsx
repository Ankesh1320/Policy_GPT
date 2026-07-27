import { LuCircleCheck } from "react-icons/lu";

const objectives = [
  "Improve quality and learning outcomes at all education levels",
  "Promote multidisciplinary and holistic learning",
  "Increase Gross Enrolment Ratio to 50% in higher education by 2035",
  "Encourage digital and technology-enabled education",
  "Reduce school dropout rates through flexible and inclusive systems",
  "Strengthen teacher training, recruitment, and professional development",
  "Promote mother tongue and regional languages as medium of instruction in early years",
  "Establish a National Research Foundation to foster high-quality research",
  "Internationalise Indian higher education institutions",
  "Integrate vocational education from Grade 6 onwards",
];

export default function ObjectivesSection() {
  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
      <h2 className="font-heading font-bold text-2xl text-slate-heading mb-6">
        Policy Objectives
      </h2>
      <div className="flex flex-col gap-3">
        {objectives.map((objective, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 bg-cream border border-border-light rounded-full px-5 py-3.5 cursor-default"
          >
            <LuCircleCheck className="h-5 w-5 text-brand-green shrink-0" />
            <span className="text-slate-heading text-sm md:text-base font-medium">
              {objective}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
