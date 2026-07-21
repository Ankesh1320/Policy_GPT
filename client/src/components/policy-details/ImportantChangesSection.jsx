export default function ImportantChangesSection() {
  const changes = [
    { num: "01", title: "New 5+3+3+4 School Structure", desc: "Replaces the old 10+2 format. Covers Foundational (age 3-8), Preparatory (8-11), Middle (11-14), and Secondary (14-18) stages." },
    { num: "02", title: "Removal of Rigid Streams", desc: "Students are no longer locked into Science, Commerce, or Arts. Any subject combination is permitted from Grade 11." },
    { num: "03", title: "Experiential & Activity-Based Learning", desc: "Emphasis on learning by doing, discussions, and project-based work — reducing rote memorisation." },
    { num: "04", title: "Expanded Digital Education", desc: "National Digital Education Architecture (NDEAR) and DIKSHA platform to deliver digital content at scale." },
    { num: "05", title: "Multiple Entry & Exit in Degrees", desc: "UG students can exit after 1 year (Certificate), 2 years (Diploma), 3 years (Degree), or 4 years (Honours/Research Degree)." },
    { num: "06", title: "Academic Bank of Credits (ABC)", desc: "A national digital repository where students store earned credits from any UGC-recognised institution." },
    { num: "07", title: "Mother Tongue as Medium of Instruction", desc: "Home language or regional language recommended as medium of instruction up to at least Grade 5, preferably Grade 8." }
  ];

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
      <h2 className="font-heading font-bold text-2xl text-slate-heading mb-6">Important Changes</h2>
      <div className="flex flex-col gap-4">
        {changes.map((item, idx) => (
          <div key={idx} className="flex gap-4 border border-border-light rounded-xl p-5 bg-[#fffaf5] hover:border-brand-orange transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold font-heading shadow-sm">
              {item.num}
            </div>
            <div>
              <h3 className="font-bold text-slate-heading mb-1.5">{item.title}</h3>
              <p className="text-sm text-text-body">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
