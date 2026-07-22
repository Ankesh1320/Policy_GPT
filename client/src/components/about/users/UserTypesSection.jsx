import { useState } from 'react';
import SectionHeader from '../../ui/SectionHeader';

export default function UserTypesSection() {
  const [activeId, setActiveId] = useState(null);

  const toggleDropdown = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const userTypes = [
    {
      id: 'citizens',
      title: 'Citizens & Families',
      tagline: 'Access benefits & check eligibility',
      activeBorderClass: 'border-brand-blue shadow-md',
      activeBulletClass: 'bg-brand-blue',
      iconBg: 'bg-brand-blue',
      useCases: [
        {
          title: 'Welfare Scheme Discovery',
          desc: 'Instantly find central and state government schemes tailored to your specific profile and needs.'
        },
        {
          title: 'AI Eligibility Checker',
          desc: 'Answer a few simple, everyday questions to see exactly which public schemes you qualify for.'
        },
        {
          title: 'Plain-Language Summaries',
          desc: 'Read policy documents simplified into clear, easy-to-understand summaries, free of complex jargon.'
        },
        {
          title: 'Multi-lingual Guidance',
          desc: 'Understand application requirements, deadlines, and benefits in your preferred regional language.'
        }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'officials',
      title: 'Government Officials',
      tagline: 'Analyze policy impact & compare schemes',
      activeBorderClass: 'border-brand-orange shadow-md',
      activeBulletClass: 'bg-brand-orange',
      iconBg: 'bg-brand-orange',
      useCases: [
        {
          title: 'Cross-State Comparisons',
          desc: 'Compare scheme benefits and implementation strategies across different states to adopt best practices.'
        },
        {
          title: 'Impact Analytics',
          desc: 'Analyze consolidated data feeds to understand how policies translate into citizen engagement.'
        },
        {
          title: 'Centralized Circular Archive',
          desc: 'Access a unified, searchable database of department circulars, amendments, and notifications.'
        },
        {
          title: 'Data-Driven Insights',
          desc: 'Identify bottlenecks in policy implementation using search trend analytics and citizen feedback.'
        }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M22 10v6M2 10v6M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
        </svg>
      )
    },
    {
      id: 'researchers',
      title: 'Researchers & Analysts',
      tagline: 'Deep semantic search & historical policy data',
      activeBorderClass: 'border-brand-blue shadow-md',
      activeBulletClass: 'bg-brand-blue',
      iconBg: 'bg-brand-blue',
      useCases: [
        {
          title: 'AI Semantic Search',
          desc: 'Find specific clauses and concepts across dense, multi-page policy texts in seconds.'
        },
        {
          title: 'Historical Archive Tracking',
          desc: 'Analyze changes in policy language, amendment tracks, and funding allocations over time.'
        },
        {
          title: 'Exportable Datasets',
          desc: 'Download policy summaries, eligibility metrics, and category lists for research and modeling.'
        },
        {
          title: 'Reference & Citation Tools',
          desc: 'Quickly copy official citations and download verified government gazettes directly.'
        }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )
    },
    {
      id: 'students',
      title: 'Students & Educators',
      tagline: 'Understand public policy & find scholarships',
      activeBorderClass: 'border-brand-orange shadow-md',
      activeBulletClass: 'bg-brand-orange',
      iconBg: 'bg-brand-orange',
      useCases: [
        {
          title: 'Civic Literacy Library',
          desc: 'Learn the fundamentals of public policy, governance structures, and constitutional rights.'
        },
        {
          title: 'Scholarship Matcher',
          desc: 'Explore and match with educational scholarships, grants, and low-interest student loans.'
        },
        {
          title: 'Curated Study Materials',
          desc: 'Use simplified breakdowns of complex bills and policy drafts for assignments and debate prep.'
        },
        {
          title: 'Governance Case Studies',
          desc: 'Study real-world impacts of major government programs through historical policy data.'
        }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      id: 'ngos',
      title: 'NGOs & Civil Society',
      activeBorderClass: 'border-brand-blue shadow-md',
      activeBulletClass: 'bg-brand-blue',
      tagline: 'Last-mile welfare delivery & bulk checks',
      iconBg: 'bg-brand-blue',
      useCases: [
        {
          title: 'Assisted Scheme Registration',
          desc: 'Help illiterate or digitally excluded citizens register for benefits using voice-assisted interfaces.'
        },
        {
          title: 'Bulk Eligibility Screening',
          desc: 'Simultaneously assess eligibility for multiple families to accelerate community welfare projects.'
        },
        {
          title: 'Grassroots Advocacy Tools',
          desc: 'Reference verified policy text and amendments when advocating for local development initiatives.'
        },
        {
          title: 'Local Resource Tracking',
          desc: 'Track direct welfare resources, agricultural subsidies, and microfinance options for communities.'
        }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )
    },
    {
      id: 'businesses',
      title: 'Businesses & Startups',
      tagline: 'Discover startup subsidies & compliance rules',
      activeBorderClass: 'border-brand-orange shadow-md',
      activeBulletClass: 'bg-brand-orange',
      iconBg: 'bg-brand-orange',
      useCases: [
        {
          title: 'MSME Benefit Navigator',
          desc: 'Easily discover government loans, credit guarantees, export subsidies, and incubator support.'
        },
        {
          title: 'Regulatory Alerts',
          desc: 'Stay informed about policy changes in labor, tax, environmental regulations, and corporate compliance.'
        },
        {
          title: 'Government Procurement Guides',
          desc: 'Understand MSME procurement quotas, tendering processes, and government purchase criteria.'
        },
        {
          title: 'CSR Project Alignment',
          desc: 'Align corporate social responsibility programs with national priority sectors to optimize impact.'
        }
      ],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    }
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 md:py-20 lg:px-20">
      <SectionHeader
        eyebrow="Target Audience"
        title="Who PolicyGPT Empowers"
        description="PolicyGPT centralizes government information to enable easy discovery, analysis, and execution of public policies for every stakeholder."
        align="center"
        eyebrowColor="text-brand-orange"
        className="mb-10 sm:mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {userTypes.map((user) => {
          const isOpen = activeId === user.id;
          return (
            <div
              key={user.id}
              className={`flex flex-col bg-cream rounded-[20px] border p-6 transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md ${
                isOpen
                  ? `${user.activeBorderClass}`
                  : 'border-border-warm hover:border-gray-300'
              }`}
              onClick={() => toggleDropdown(user.id)}
            >
              {/* Header Box */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${user.iconBg} ${
                    isOpen ? 'scale-110' : ''
                  }`}
                >
                  {user.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading text-lg font-bold text-slate-heading">
                    {user.title}
                  </h3>
                  <p className="font-body text-xs text-slate-muted font-medium">
                    {user.tagline}
                  </p>
                </div>
                <div className="shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-slate-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand-orange' : ''
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Collapsible Dropdown Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'
                }`}
              >
                <div className="overflow-hidden border-t border-gray-300/40 pt-4">

                  <ul className="space-y-4">
                    {user.useCases.map((uc, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {/* Bullet point check icon */}
                        <span className={`flex w-5 h-5 rounded-full items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-white ${user.activeBulletClass}`}>
                          ✓
                        </span>
                        <div>
                          <strong className="font-heading text-sm text-slate-heading block">
                            {uc.title}
                          </strong>
                          <span className="font-body text-xs text-slate-muted leading-relaxed block mt-0.5 font-medium">
                            {uc.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
