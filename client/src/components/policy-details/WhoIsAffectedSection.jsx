import * as LuIcons from "react-icons/lu";

export default function WhoIsAffectedSection({ policy }) {
  const fallbackPrimary = [
    { title: "Students", desc: "From pre-primary to doctoral level across India", isPrimary: true, icon: "LuBackpack" },
    { title: "Teachers & Educators", desc: "All school and college faculty", isPrimary: true, icon: "LuBookOpen" },
    { title: "Schools & Colleges", desc: "All Central and State-funded institutions", isPrimary: true, icon: "LuSchool" },
    { title: "Universities", desc: "Public and private higher education institutions", isPrimary: true, icon: "LuLibrary" }
  ];

  const fallbackSecondary = [
    { title: "Parents & Guardians", desc: "Families with school and college-going children", isPrimary: false, icon: "LuUsers" },
    { title: "Educational Boards", desc: "CBSE, State boards, and autonomous bodies", isPrimary: false, icon: "LuClipboardList" },
    { title: "State Governments", desc: "Responsible for state-level implementation", isPrimary: false, icon: "LuMapPin" },
    { title: "Private Institutions", desc: "Affiliated private schools, colleges, coaching centres", isPrimary: false, icon: "LuBuilding" }
  ];

  const hasWhoIsAffected = policy?.whoIsAffected && policy.whoIsAffected.length > 0;
  const primary = hasWhoIsAffected ? policy.whoIsAffected.filter(s => s.isPrimary) : fallbackPrimary;
  const secondary = hasWhoIsAffected ? policy.whoIsAffected.filter(s => !s.isPrimary) : fallbackSecondary;
  const department = policy?.department || "Ministry of Education";

  const renderStakeholderCard = (item, idx, theme) => {
    const iconName = item.icon || "Users";
    let IconComponent = LuIcons[iconName];
    if (!IconComponent && iconName) {
      IconComponent = LuIcons[`Lu${iconName.replace(/^Lu/, "")}`];
    }
    if (!IconComponent) {
      IconComponent = LuIcons.LuUsers;
    }

    const isBlue = theme === "blue";
    const bgClass = isBlue ? "bg-card-blue border-[#c7d2fe]" : "bg-card-orange border-[#fed7aa]";
    const iconClass = isBlue ? "text-brand-blue" : "text-brand-orange";

    return (
      <div key={idx} className={`rounded-xl p-5 border ${bgClass}`}>
        <IconComponent className={`${iconClass} h-6 w-6 mb-3`} />
        <h3 className="font-bold text-slate-heading">{item.title}</h3>
        <p className="text-sm text-text-body mt-1">{item.desc}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Primary Stakeholders */}
      {primary.length > 0 && (
        <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-blue"></div>
            <h2 className="font-heading font-bold text-xl text-slate-heading">Primary Stakeholders</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primary.map((item, idx) => renderStakeholderCard(item, idx, "blue"))}
          </div>
        </div>
      )}

      {/* Secondary Stakeholders */}
      {secondary.length > 0 && (
        <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>
            <h2 className="font-heading font-bold text-xl text-slate-heading">Secondary Stakeholders</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondary.map((item, idx) => renderStakeholderCard(item, idx, "orange"))}
          </div>
        </div>
      )}

      {/* Implementing Authority */}
      <div className="bg-white rounded-2xl border border-border-light p-6 flex gap-4 items-center">
        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
          <LuIcons.LuLandmark className="text-text-body h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-heading">Implementing Authority</h3>
          <p className="text-sm text-text-body">{department}, Government of India</p>
        </div>
      </div>

    </div>
  );
}
