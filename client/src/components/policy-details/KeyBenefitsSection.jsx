import {
  LuLayers,
  LuWrench,
  LuGraduationCap,
  LuMonitor,
  LuBookOpen,
  LuType,
  LuLandmark,
  LuGlobe,
} from "react-icons/lu";

export default function KeyBenefitsSection() {
  const benefits = [
    { icon: LuLayers, title: "Flexible Subject Choices", desc: "Students can choose subjects across streams — no rigid Science / Commerce / Arts division.", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: LuWrench, title: "Vocational from Grade 6", desc: "Practical skills and vocational training integrated from middle school onwards.", color: "text-gray-500", bg: "bg-gray-100" },
    { icon: LuGraduationCap, title: "Multiple Entry & Exit", desc: "Undergraduate students can exit with a Certificate (1 yr), Diploma (2 yr), or Degree (3-4 yr).", color: "text-blue-800", bg: "bg-indigo-50" },
    { icon: LuMonitor, title: "Digital Education Push", desc: "National Educational Technology Forum (NETF) to accelerate e-learning infrastructure.", color: "text-cyan-600", bg: "bg-cyan-50" },
    { icon: LuBookOpen, title: "Better Teacher Training", desc: "4-year integrated B.Ed as the minimum qualification for all teachers by 2030.", color: "text-green-600", bg: "bg-green-50" },
    { icon: LuType, title: "Foundational Literacy Focus", desc: "National Mission on Foundational Literacy and Numeracy for Grades 1-3 by 2026-27.", color: "text-brand-orange", bg: "bg-orange-50" },
    { icon: LuLandmark, title: "Academic Bank of Credits", desc: "Credits earned at any institution can be stored and transferred, enabling flexible learning paths.", color: "text-gray-600", bg: "bg-gray-100" },
    { icon: LuGlobe, title: "Internationalisation", desc: "Top foreign universities permitted to set up campuses in India to raise global competitiveness.", color: "text-blue-500", bg: "bg-blue-50" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
      <h2 className="font-heading font-bold text-2xl text-slate-heading mb-6">Key Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div key={idx} className="border border-border-light rounded-xl p-5 hover:border-gray-300 transition-colors bg-[#fafafa]">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${benefit.bg}`}>
                <Icon className={`h-5 w-5 ${benefit.color}`} />
              </div>
              <h3 className="font-bold text-slate-heading mb-2">{benefit.title}</h3>
              <p className="text-sm text-text-body leading-relaxed">{benefit.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
