export default function OverviewSection({ policy }) {
  const description = policy?.description || "The National Education Policy 2020 is India's new education framework designed to modernise the education system. It focuses on improving learning outcomes, encouraging critical thinking, promoting digital education, and making quality education accessible for all students from pre-primary through higher education.";
  const vision = policy?.vision || "To build an equitable, inclusive, and future-ready education system that prepares every learner with the knowledge, skills, values, and character needed for the 21st century — rooted in India's traditions and aligned with global aspirations.";

  return (
    <div className="flex flex-col gap-6">
      {/* Policy Overview Card */}
      <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
        <h2 className="font-heading font-bold text-2xl text-slate-heading mb-4">
          Policy Overview
        </h2>
        <p className="text-text-body leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </div>

      {/* Vision Card */}
      {vision && (
        <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <h2 className="font-heading font-bold text-2xl text-slate-heading mb-5">
            Vision
          </h2>
          <div 
            className="border-l-[4px] border-brand-orange rounded-2xl pl-6 pr-5 py-6"
            style={{
              background: "linear-gradient(to right, #fff4ea 0%, #ffffff 40%, #f0fdf4 100%)"
            }}
          >
            <p className="text-slate-heading leading-relaxed text-base">
              &quot;{vision}&quot;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
