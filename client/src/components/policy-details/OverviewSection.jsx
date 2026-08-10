export default function OverviewSection({ policy }) {
  if (policy) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <h2 className="font-heading font-bold text-2xl text-slate-heading mb-4">
            Policy Overview
          </h2>
          <p className="text-text-body mb-4 leading-relaxed whitespace-pre-wrap">
            {policy.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Policy Overview Card */}
      <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
        <h2 className="font-heading font-bold text-2xl text-slate-heading mb-4">
          Policy Overview
        </h2>
        <p className="text-text-body mb-4 leading-relaxed">
          The National Education Policy 2020 is India&apos;s new education framework designed to modernise
          the education system. It focuses on improving learning outcomes, encouraging critical thinking,
          promoting digital education, and making quality education accessible for all students from pre-primary
          through higher education.
        </p>
        <p className="text-text-body leading-relaxed">
          NEP 2020 replaces the earlier National Policy on Education 1986 (as amended in 1992). It sets
          out a comprehensive vision covering school education, higher education, vocational education,
          and teacher education — with a target of full implementation by 2040.
        </p>
      </div>

      {/* Vision Card */}
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
            &quot;To build an equitable, inclusive, and future-ready education system that prepares every
            learner with the knowledge, skills, values, and character needed for the 21st century —
            rooted in India&apos;s traditions and aligned with global aspirations.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
