import { useState, useEffect } from 'react';
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
  MoreVertical,
  FileText
} from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { schemeService } from '../../services/schemeService';
import { policyService } from '../../services/policyService';

const MOCK_SCHEMES = [
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

const MOCK_POLICIES = [
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

const categoryIcons = {
  'Agriculture': Sprout,
  'Agriculture & Farming': Sprout,
  'Housing': Home,
  'Finance': Coins,
  'Security': ShieldAlert,
  'Healthcare': HeartPulse,
  'HealthCare & Medical': HeartPulse,
  'Employment': Briefcase,
  'Education': GraduationCap,
  'Education & Scholarship': GraduationCap,
  'Education & Schloarship': GraduationCap,
  'Technology': Globe,
  'Environment': CloudSun,
};
const getCategoryIcon = (category) => categoryIcons[category] || FileText;

const categoryStyles = {
  'Agriculture': 'bg-green-50 text-green-600',
  'Agriculture & Farming': 'bg-green-50 text-green-600',
  'Housing': 'bg-blue-50 text-blue-600',
  'Finance': 'bg-amber-50 text-amber-600',
  'Security': 'bg-indigo-50 text-indigo-600',
  'Healthcare': 'bg-rose-50 text-rose-600',
  'HealthCare & Medical': 'bg-rose-50 text-rose-600',
  'Employment': 'bg-purple-50 text-purple-600',
  'Education': 'bg-purple-50 text-[#a855f7]',
  'Education & Scholarship': 'bg-purple-50 text-[#a855f7]',
  'Education & Schloarship': 'bg-purple-50 text-[#a855f7]',
  'Technology': 'bg-blue-50 text-blue-600',
  'Environment': 'bg-teal-50 text-teal-600',
};
const getCategoryStyles = (category) => categoryStyles[category] || 'bg-gray-50 text-gray-600';

const statusStyles = {
  'Published': 'bg-green-50 text-green-700 border-green-200/30',
  'Under Review': 'bg-amber-50 text-amber-700 border-amber-200/30',
  'Draft': 'bg-blue-50 text-blue-700 border-blue-200/30',
  'Archived': 'bg-gray-100 text-gray-700 border-gray-200/30',
  'Approved': 'bg-green-50 text-green-700 border-green-200/30',
};
const getStatusStyle = (status) => statusStyles[status] || 'bg-blue-50 text-blue-700 border-[#bfdbfe]/30';

function timeSince(dateStr) {
  if (!dateStr) return 'Updated just now';
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'Updated just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Updated ${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `Updated ${days} day${days > 1 ? 's' : ''} ago`;
}

export default function ManagementSections() {
  const navigate = useNavigate();
  const [activeSchemeTab, setActiveSchemeTab] = useState('All Schemes');
  const [activePolicyTab, setActivePolicyTab] = useState('All Policies');

  // Backend live lists
  const [liveSchemes, setLiveSchemes] = useState([]);
  const [livePolicies, setLivePolicies] = useState([]);

  useEffect(() => {
    // Fetch live backend data
    const fetchLiveStats = async () => {
      try {
        const schemesData = await schemeService.getAll();
        if (schemesData && schemesData.length > 0) {
          // Sort live data by updatedAt descending
          const formatted = schemesData
            .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
            .map(s => ({
              title: s.name || s.title,
              category: s.category || 'Technology',
              status: s.status || 'Draft',
              updated: timeSince(s.updatedAt),
              icon: getCategoryIcon(s.category),
              iconBg: getCategoryStyles(s.category),
              statusBg: getStatusStyle(s.status || 'Draft')
            }));
          setLiveSchemes(formatted);
        }
      } catch (err) {
        console.error('Failed to load schemes in dashboard:', err);
      }

      try {
        const policiesData = await policyService.getAll();
        if (policiesData && policiesData.length > 0) {
          const formatted = policiesData
            .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
            .map(p => ({
              title: p.name || p.title,
              category: p.category || 'Technology',
              status: p.status || 'Draft',
              updated: timeSince(p.updatedAt),
              icon: getCategoryIcon(p.category),
              iconBg: getCategoryStyles(p.category),
              statusBg: getStatusStyle(p.status || 'Draft')
            }));
          setLivePolicies(formatted);
        }
      } catch (err) {
        console.error('Failed to load policies in dashboard:', err);
      }
    };

    fetchLiveStats();
  }, []);

  // Use live data if loaded, otherwise fall back gracefully to beautiful mock data
  const schemesList = liveSchemes.length > 0 ? liveSchemes : MOCK_SCHEMES;
  const policiesList = livePolicies.length > 0 ? livePolicies : MOCK_POLICIES;

  // Filter schemes
  const filteredSchemes = schemesList.filter(scheme => {
    if (activeSchemeTab === 'All Schemes') return true;
    if (activeSchemeTab === 'Pending Review') return scheme.status === 'Under Review' || scheme.status === 'Pending';
    return scheme.status === activeSchemeTab;
  });

  // Filter policies
  const filteredPolicies = policiesList.filter(policy => {
    if (activePolicyTab === 'All Policies') return true;
    return policy.status === activePolicyTab;
  });

  // Display top 5 matches
  const displaySchemes = filteredSchemes.slice(0, 5);
  const displayPolicies = filteredPolicies.slice(0, 5);

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Scheme Management */}
      <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Scheme Management</h2>
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
          {displaySchemes.length > 0 ? (
            displaySchemes.map((scheme, idx) => {
              const Icon = scheme.icon;
              return (
                <div key={idx} className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-cream hover:bg-orange-100 transition-colors">
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
          <Button
            variant="primary"
            icon={<ArrowRight size={16} />}
            onClick={() => navigate('/admin/scheme-management')}
          >
            Manage All Schemes
          </Button>
        </div>
      </div>

      {/* Policy Management */}
      <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Policy Management</h2>
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
          {displayPolicies.length > 0 ? (
            displayPolicies.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div key={idx} className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-cream hover:bg-orange-100 transition-colors">
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
          <Button
            variant="primary"
            icon={<ArrowRight size={16} />}
            onClick={() => navigate('/admin/policy-management')}
          >
            Manage All Policies
          </Button>
        </div>
      </div>
    </section>
  );
}
