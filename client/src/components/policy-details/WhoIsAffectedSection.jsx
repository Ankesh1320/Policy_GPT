import {
  LuBackpack,
  LuBookOpen,
  LuSchool,
  LuLibrary,
  LuUsers,
  LuClipboardList,
  LuMapPin,
  LuBuilding,
  LuLandmark,
  LuCircleCheck,
} from "react-icons/lu";

export default function WhoIsAffectedSection({ policy }) {
  if (policy && policy.eligibility) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>
            <h2 className="font-heading font-bold text-xl text-slate-heading">Target Eligibility & Stakeholders</h2>
          </div>
          <div className="flex flex-col gap-3">
            {policy.eligibility.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-[#fffaf5] border border-[#ffeedd] rounded-xl hover:border-brand-orange/30 transition-colors"
              >
                <LuCircleCheck className="text-brand-orange h-5 w-5 shrink-0 mt-0.5" />
                <span className="font-semibold text-sm text-slate-heading leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Primary Stakeholders */}
      <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-blue"></div>
          <h2 className="font-heading font-bold text-xl text-slate-heading">Primary Stakeholders</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card-blue rounded-xl p-5 border border-[#c7d2fe]">
            <LuBackpack className="text-brand-blue h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">Students</h3>
            <p className="text-sm text-text-body mt-1">From pre-primary to doctoral level across India</p>
          </div>
          <div className="bg-card-blue rounded-xl p-5 border border-[#c7d2fe]">
            <LuBookOpen className="text-brand-blue h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">Teachers & Educators</h3>
            <p className="text-sm text-text-body mt-1">All school and college faculty</p>
          </div>
          <div className="bg-card-blue rounded-xl p-5 border border-[#c7d2fe]">
            <LuSchool className="text-brand-blue h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">Schools & Colleges</h3>
            <p className="text-sm text-text-body mt-1">All Central and State-funded institutions</p>
          </div>
          <div className="bg-card-blue rounded-xl p-5 border border-[#c7d2fe]">
            <LuLibrary className="text-brand-blue h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">Universities</h3>
            <p className="text-sm text-text-body mt-1">Public and private higher education institutions</p>
          </div>
        </div>
      </div>

      {/* Secondary Stakeholders */}
      <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>
          <h2 className="font-heading font-bold text-xl text-slate-heading">Secondary Stakeholders</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card-orange rounded-xl p-5 border border-[#fed7aa]">
            <LuUsers className="text-brand-orange h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">Parents & Guardians</h3>
            <p className="text-sm text-text-body mt-1">Families with school and college-going children</p>
          </div>
          <div className="bg-card-orange rounded-xl p-5 border border-[#fed7aa]">
            <LuClipboardList className="text-brand-orange h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">Educational Boards</h3>
            <p className="text-sm text-text-body mt-1">CBSE, State boards, and autonomous bodies</p>
          </div>
          <div className="bg-card-orange rounded-xl p-5 border border-[#fed7aa]">
            <LuMapPin className="text-brand-orange h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">State Governments</h3>
            <p className="text-sm text-text-body mt-1">Responsible for state-level implementation</p>
          </div>
          <div className="bg-card-orange rounded-xl p-5 border border-[#fed7aa]">
            <LuBuilding className="text-brand-orange h-6 w-6 mb-3" />
            <h3 className="font-bold text-slate-heading">Private Institutions</h3>
            <p className="text-sm text-text-body mt-1">Affiliated private schools, colleges, coaching centres</p>
          </div>
        </div>
      </div>

      {/* Implementing Authority */}
      <div className="bg-white rounded-2xl border border-border-light p-6 flex gap-4 items-center">
        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
          <LuLandmark className="text-text-body h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-heading">Implementing Authority</h3>
          <p className="text-sm text-text-body">Ministry of Education, Government of India</p>
          <p className="text-xs text-text-slate mt-0.5">In coordination with State Education Departments and UGC, NCERT, AICTE</p>
        </div>
      </div>

    </div>
  );
}
