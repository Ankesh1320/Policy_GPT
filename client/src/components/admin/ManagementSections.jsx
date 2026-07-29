import { useState } from 'react';
import { 
  ArrowRight, 
  Sprout, 
  HeartPulse, 
  Home, 
  Coins, 
  Briefcase, 
  GraduationCap, 
  Activity, 
  Globe, 
  CloudSun, 
  ShieldAlert, 
  MoreVertical 
} from 'lucide-react';
import Button from '../ui/Button';

const SCHEMES = [
  {
    title: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    status: 'Approved',
    updated: 'Updated 2 days ago',
    icon: Sprout,
    iconBg: 'bg-green-50 text-green-600',
    statusBg: 'bg-green-50 text-green-700 border-green-200/30'
  },
  {
    title: 'Ayushman Bharat PM-JAY',
    category: 'Healthcare',
    status: 'Under Review',
    updated: 'Updated 1 day ago',
    icon: HeartPulse,
    iconBg: 'bg-rose-50 text-rose-600',
    statusBg: 'bg-amber-50 text-amber-700 border-amber-200/30'
  },
  {
    title: 'PM Awas Yojana – Urban',
    category: 'Housing',
    status: 'Approved',
    updated: 'Updated 3 days ago',
    icon: Home,
    iconBg: 'bg-blue-50 text-blue-600',
    statusBg: 'bg-green-50 text-green-700 border-green-200/30'
  },
  {
    title: 'Sukanya Samriddhi Yojana',
    category: 'Finance',
    status: 'Draft',
    updated: 'Updated 5 days ago',
    icon: Coins,
    iconBg: 'bg-amber-50 text-amber-600',
    statusBg: 'bg-blue-50 text-blue-700 border-blue-200/30'
  },
  {
    title: 'Startup India Initiative',
    category: 'Employment',
    status: 'Pending',
    updated: 'Updated 6 days ago',
    icon: Briefcase,
    iconBg: 'bg-purple-50 text-purple-600',
    statusBg: 'bg-yellow-50 text-yellow-700 border-yellow-200/30'
  }
];

const POLICIES = [
  {
    title: 'National Education Policy 2020',
    category: 'Education',
    status: 'Published',
    updated: 'Updated 2 days ago',
    icon: GraduationCap,
    iconBg: 'bg-purple-50 text-purple-600',
    statusBg: 'bg-green-50 text-green-700 border-green-200/30'
  },
  {
    title: 'National Health Policy 2017',
    category: 'Healthcare',
    status: 'Under Review',
    updated: 'Updated 1 day ago',
    icon: Activity,
    iconBg: 'bg-rose-50 text-rose-600',
    statusBg: 'bg-amber-50 text-amber-700 border-amber-200/30'
  },
  {
    title: 'Digital India Policy',
    category: 'Technology',
    status: 'Published',
    updated: 'Updated 3 days ago',
    icon: Globe,
    iconBg: 'bg-blue-50 text-blue-600',
    statusBg: 'bg-green-50 text-green-700 border-green-200/30'
  },
  {
    title: 'Climate Change Action Plan',
    category: 'Environment',
    status: 'Draft',
    updated: 'Updated 5 days ago',
    icon: CloudSun,
    iconBg: 'bg-teal-50 text-teal-600',
    statusBg: 'bg-blue-50 text-blue-700 border-blue-200/30'
  },
  {
    title: 'Data Protection Policy',
    category: 'Security',
    status: 'Under Review',
    updated: 'Updated 6 days ago',
    icon: ShieldAlert,
    iconBg: 'bg-indigo-50 text-indigo-600',
    statusBg: 'bg-amber-50 text-amber-700 border-amber-200/30'
  }
];

export default function ManagementSections() {
  const [activeSchemeTab, setActiveSchemeTab] = useState('All Schemes');
  const [activePolicyTab, setActivePolicyTab] = useState('All Policies');

  const filteredSchemes = SCHEMES.filter(scheme => {
    if (activeSchemeTab === 'All Schemes') return true;
    if (activeSchemeTab === 'Pending Review') return scheme.status === 'Under Review' || scheme.status === 'Pending';
    return scheme.status === activeSchemeTab;
  });

  const filteredPolicies = POLICIES.filter(policy => {
    if (activePolicyTab === 'All Policies') return true;
    return policy.status === activePolicyTab;
  });

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Scheme Management */}
      <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Scheme Management</h2>
          <button className="text-sm font-semibold text-brand-orange hover:text-orange-600 cursor-pointer">View all</button>
        </div>
        
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['All Schemes', 'Pending Review', 'Approved', 'Draft'].map(tab => (
            <button 
              key={tab} 
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                activeSchemeTab === tab 
                  ? 'bg-orange-50 border-[#F2762E] text-[#F2762E]' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setActiveSchemeTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="mb-5 flex flex-col gap-3">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme, idx) => {
              const Icon = scheme.icon;
              return (
                <div key={idx} className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${scheme.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-gray-900 leading-tight">{scheme.title}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">{scheme.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${scheme.statusBg}`}>
                      {scheme.status}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">{scheme.updated}</span>
                    <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-[#F7F2E8]/30 p-8 text-center text-sm text-gray-500 font-medium">
              No schemes available
            </div>
          )}
        </div>
        
        <div className="mt-auto flex justify-center">
          <Button variant="primary" icon={<ArrowRight size={16} />}>
            Manage All Schemes
          </Button>
        </div>
      </div>

      {/* Policy Management */}
      <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Policy Management</h2>
          <button className="text-sm font-semibold text-brand-orange hover:text-orange-600 cursor-pointer">View all</button>
        </div>
        
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['All Policies', 'Published', 'Draft', 'Under Review'].map(tab => (
            <button 
              key={tab} 
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                activePolicyTab === tab 
                  ? 'bg-orange-50 border-[#F2762E] text-[#F2762E]' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setActivePolicyTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="mb-5 flex flex-col gap-3">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div key={idx} className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${policy.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-gray-900 leading-tight">{policy.title}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">{policy.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${policy.statusBg}`}>
                      {policy.status}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">{policy.updated}</span>
                    <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-[#F7F2E8]/30 p-8 text-center text-sm text-gray-500 font-medium">
              No policies available
            </div>
          )}
        </div>
        
        <div className="mt-auto flex justify-center">
          <Button variant="primary" icon={<ArrowRight size={16} />}>
            Manage All Policies
          </Button>
        </div>
      </div>
    </section>
  );
}
