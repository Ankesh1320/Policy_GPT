export default function TimelineSection({ policy }) {
  const fallbackEvents = [
    { year: "2020", title: "Policy Approved", desc: "Union Cabinet approves NEP 2020 on 29 July, replacing the 34-year-old policy." },
    { year: "2021", title: "Curriculum Planning", desc: "NCERT begins revising National Curriculum Framework. Higher education institutions start 4-year UG pilot programmes." },
    { year: "2022", title: "Teacher Training Begins", desc: "National Initiative for Proficiency in Reading with Understanding and Numeracy (NIPUN Bharat) launched for foundational learning." },
    { year: "2023", title: "Digital Infrastructure Expansion", desc: "DIKSHA platform scaled up. Academic Bank of Credits becomes operational. New National Curriculum Framework released." },
    { year: "2024", title: "Revised Textbooks & Curricula", desc: "New NCERT textbooks aligned to NCF 2023 rolled out for Grades 1 and 2. State boards begin adopting NEP-aligned structures." },
    { year: "2030+", title: "Full Teacher Qualification Reform", desc: "All teachers to hold 4-year integrated B.Ed as minimum qualification. National Research Foundation fully operational." },
    { year: "2040", title: "Nationwide Full Implementation", desc: "Target year for complete implementation of all NEP 2020 reforms across all institutions and levels." }
  ];

  const list = policy?.timeline && policy.timeline.length > 0 ? policy.timeline : fallbackEvents;

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
      <h2 className="font-heading font-bold text-2xl text-slate-heading mb-8">Implementation Timeline</h2>
      <div className="relative border-l border-gray-200 ml-3 space-y-6">
        {list.map((evt, idx) => {
          const dotColor = idx % 2 === 0 ? "#fd7a08" : "#2251ca";
          const bgColor = idx % 2 === 0 ? "#fff7ed" : "#eef2ff";
          return (
            <div key={idx} className="relative pl-6">
              <span className="absolute -left-[8.4px] top-4 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: dotColor }}></span>
              <div className="rounded-xl p-5 border border-transparent" style={{ backgroundColor: bgColor }}>
                <h3 className="font-bold text-slate-heading mb-1.5"><span className="text-gray-900">{evt.year} —</span> {evt.title}</h3>
                <p className="text-sm text-text-body">{evt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
