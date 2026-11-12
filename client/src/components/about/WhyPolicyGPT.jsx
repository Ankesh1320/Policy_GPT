

function FeatureCard({ icon, title, description, iconBg, iconColor }) {
  return (
    <div className="flex flex-col bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <h3 className="font-heading text-lg font-bold text-slate-heading mb-2">
        {title}
      </h3>
      <p className="font-body text-sm text-slate-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function WhyPolicyGPT() {
  const features = [
    {
      title: 'Citizen First',
      description: 'Built for real people, not bureaucrats',
      iconBg: 'bg-[#FDF2F8]',
      iconColor: 'text-[#DB2777]',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      title: 'AI Powered',
      description: 'Smart matching and instant answers',
      iconBg: 'bg-[#F5F3FF]',
      iconColor: 'text-[#7C3AED]',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8.01" y2="16" />
          <line x1="16" y1="16" x2="16.01" y2="16" />
          <path d="M9 11V9a3 3 0 0 1 6 0v2" />
        </svg>
      )
    },
    {
      title: 'Privacy Safe',
      description: 'Your data stays private always',
      iconBg: 'bg-[#FFFBEB]',
      iconColor: 'text-[#D97706]',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: 'Clear Guidance',
      description: 'Plain-English explanations for every step',
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#2563EB]',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    }
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 md:py-20 lg:px-20">
      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-slate-heading sm:text-[30px] sm:leading-tight mb-6">
              Why PolicyGPT?
            </h2>
            <p className="font-body text-sm md:text-base text-slate-muted leading-relaxed mb-5 font-medium">
              India has over 2,400 government welfare schemes and more than 850 active public policies spread across 50+ ministries. Historically, this vital information has been scattered across hundreds of fragmented portals, written in complex bureaucratic jargon, and largely inaccessible to the very citizens, researchers, and NGOs who need it most.
            </p>
            <p className="font-body text-sm md:text-base text-slate-muted leading-relaxed mb-6 font-medium">
              PolicyGPT bridges this critical information gap by consolidating federal and state documents into a single, unified cognitive platform. By leveraging natural language processing, we translate dense legislative and executive texts into clear, actionable summaries.
            </p>
          </div>

          </div>

        {/* Right Column */}
        <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconBg={feature.iconBg}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
