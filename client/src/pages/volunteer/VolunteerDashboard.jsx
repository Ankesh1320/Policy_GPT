import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  FileText,
  Layers,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Calendar,
  MoreVertical,
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
  Search,
  SlidersHorizontal,
  Eye,
  ChevronDown,
} from 'lucide-react';
import VolunteerSidebar from '../../components/volunteer/VolunteerSidebar';
import VolunteerHeader from '../../components/volunteer/VolunteerHeader';
import ReviewModal from '../../components/volunteer/ReviewModal';
import { schemeService } from '../../services/schemeService';
import { policyService } from '../../services/policyService';

/* ─── Static sample data ──────────────────────────────────────────────── */
const SAMPLE_PENDING_POLICIES = [
  { id: 'p1', name: 'National Education Policy 2020', category: 'Education', department: 'Ministry of Education', submittedAgo: '3 days ago', priority: 'High', icon: GraduationCap, iconBg: 'bg-purple-50 text-purple-600' },
  { id: 'p2', name: 'Digital India Policy', category: 'Technology', department: 'Ministry of Electronics & IT', submittedAgo: '4 days ago', priority: 'Medium', icon: Globe, iconBg: 'bg-blue-50 text-blue-600' },
  { id: 'p3', name: 'National Environment Policy 2006', category: 'Environment', department: 'Ministry of Environment', submittedAgo: '5 days ago', priority: 'Medium', icon: CloudSun, iconBg: 'bg-teal-50 text-teal-600' },
  { id: 'p4', name: 'Data Protection Policy', category: 'Security', department: 'Ministry of Electronics & IT', submittedAgo: '4 days ago', priority: 'High', icon: ShieldAlert, iconBg: 'bg-indigo-50 text-indigo-600' },
  { id: 'p5', name: 'AI for All Policy', category: 'Technology', department: 'NITI Aayog', submittedAgo: '7 days ago', priority: 'Low', icon: Activity, iconBg: 'bg-rose-50 text-rose-600' },
];

const SAMPLE_PENDING_SCHEMES = [
  { id: 's1', name: 'PM Kisan Samman Nidhi Scheme', category: 'Agriculture', department: 'Ministry of Agriculture', submittedAgo: '2 days ago', priority: 'Medium', icon: Sprout, iconBg: 'bg-green-50 text-green-600' },
  { id: 's2', name: 'PM Awas Yojana – Urban', category: 'Housing', department: 'Ministry of Housing & Urban Affairs', submittedAgo: '3 days ago', priority: 'High', icon: Home, iconBg: 'bg-blue-50 text-blue-600' },
  { id: 's3', name: 'Ayushman Bharat PM-JAY', category: 'Healthcare', department: 'Ministry of Health & Family Welfare', submittedAgo: '4 days ago', priority: 'High', icon: HeartPulse, iconBg: 'bg-rose-50 text-rose-600' },
  { id: 's4', name: 'Startup India Initiative', category: 'Employment', department: 'Department for Promotion of Industry', submittedAgo: '5 days ago', priority: 'Medium', icon: Briefcase, iconBg: 'bg-purple-50 text-purple-600' },
  { id: 's5', name: 'Beti Bachao Beti Padhao', category: 'Women & Child Development', department: 'Ministry of Women & Child Dev.', submittedAgo: '6 days ago', priority: 'Low', icon: Coins, iconBg: 'bg-amber-50 text-amber-600' },
];

const SAMPLE_RECENT_ACTIVITY = [
  { id: 'a1', action: 'Approved', itemType: 'Scheme', itemName: 'PM Ujjwala Yojana', actionBy: 'You', time: '2 hours ago', status: 'Approved' },
  { id: 'a2', action: 'Requested Changes', itemType: 'Policy', itemName: 'Digital India Policy', actionBy: 'You', time: '5 hours ago', status: 'Changes Requested' },
  { id: 'a3', action: 'Approved', itemType: 'Scheme', itemName: 'Khelo India Scheme', actionBy: 'You', time: '1 day ago', status: 'Approved' },
];

const SCHEME_DEPARTMENTS = [
  'All Departments',
  'Ministry of Agriculture & Farmers Welfare',
  'Ministry of Housing & Urban Affairs',
  'Ministry of Women & Child Development',
  'Ministry of Health & Family Welfare',
  'Ministry of Finance',
  'Department for Promotion of Industry & Internal Trade',
  'Ministry of Electronics & Information Technology',
];

const POLICY_DEPARTMENTS = [
  'All Departments',
  'Ministry of Education',
  'Ministry of Health & Family Welfare',
  'Ministry of Electronics & IT',
  'Ministry of Environment',
  'Ministry of Commerce & Industry',
];

const STATUS_OPTIONS = ['All Status', 'Published', 'Under Review', 'Draft', 'Archived', 'Approved'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'A–Z', 'Z–A'];
const PAGE_SIZE = 7;

/* ─── Priority badge ──────────────────────────────────────────────────── */
function PriorityBadge({ priority }) {
  const map = {
    High: 'bg-orange-50 text-[#F2762E] border border-orange-200/30',
    Medium: 'bg-amber-50 text-amber-700 border border-amber-200/30',
    Low: 'bg-green-50 text-green-700 border border-green-200/30',
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${map[priority] || 'bg-gray-100 text-gray-500'}`}>
      {priority}
    </span>
  );
}

/* ─── Status badge ────────────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    Published:      { dot: 'bg-green-400', cls: 'bg-green-50 text-green-700 border border-green-200/30' },
    'Under Review': { dot: 'bg-amber-400', cls: 'bg-amber-50 text-amber-700 border border-amber-200/30' },
    Draft:          { dot: 'bg-blue-400',  cls: 'bg-blue-50 text-blue-700 border border-blue-200/30' },
    Archived:       { dot: 'bg-gray-400',  cls: 'bg-gray-100 text-gray-600 border border-gray-200/30' },
    Approved:       { dot: 'bg-green-400', cls: 'bg-green-50 text-green-700 border border-green-200/30' },
  };
  const cfg = map[status] || map['Draft'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {status}
    </span>
  );
}

/* ─── Item type tag ───────────────────────────────────────────────────── */
function TypeTag({ type }) {
  const isScheme = type === 'Scheme';
  return (
    <span className={`px-2 py-0.5 rounded text-[12px] font-semibold ${isScheme ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
      {type}
    </span>
  );
}

/* ─── Stat Card ───────────────────────────────────────────────────────── */
function VolunteerStatCard({ icon, iconBg, value, label, sublabel, sublabelColor }) {
  return (
    <article className="flex flex-col items-center justify-center rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div className="mb-1 font-heading text-[26px] font-bold text-gray-900 leading-none">{value}</div>
      <div className="mb-1 w-full truncate text-center text-[13px] font-semibold text-gray-500 leading-tight">
        {label}
      </div>
      <div className={`text-[12px] font-semibold ${sublabelColor || 'text-gray-400'}`}>{sublabel}</div>
    </article>
  );
}

/* ─── Review item card — dashboard card list style ────────────────────── */
function ReviewItemCard({ item, onReview, type }) {
  const Icon = item.icon || FileText;
  return (
    <div className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-cream hover:bg-orange-100 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg || 'bg-gray-50 text-gray-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-gray-900 leading-tight truncate">{item.name}</p>
          <p className="text-xs text-gray-400 mt-1 font-medium">{item.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <PriorityBadge priority={item.priority} />
        <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">{item.submittedAgo}</span>
        <button
          onClick={() => onReview(item, type)}
          className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-[#F2762E] hover:text-white hover:border-[#F2762E] transition-all cursor-pointer whitespace-nowrap"
        >
          Review
        </button>
      </div>
    </div>
  );
}

/* ─── Dropdown ────────────────────────────────────────────────────────── */
function LocalDropdown({ value, options, onChange, prefix }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        {prefix}
        {value}
        <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[200px] max-h-[300px] overflow-y-auto">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                value === opt ? 'bg-orange-50 text-[#F2762E] font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */
export default function VolunteerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  // Search and filter parameters for Tab Views
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDetailsItem, setSelectedDetailsItem] = useState(null);
  const [detailsType, setDetailsType] = useState('scheme'); // 'scheme' | 'policy'

  // Master lists
  const [allSchemes, setAllSchemes] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);

  // Pending lists for Dashboard
  const [pendingPolicies, setPendingPolicies] = useState(SAMPLE_PENDING_POLICIES);
  const [pendingSchemes, setPendingSchemes] = useState(SAMPLE_PENDING_SCHEMES);
  const [recentActivity, setRecentActivity] = useState(SAMPLE_RECENT_ACTIVITY);
  const [stats, setStats] = useState({
    pendingPolicies: 12,
    pendingSchemes: 14,
    approvedThisMonth: 24,
    changesThisMonth: 8,
    totalReviewed: 36,
  });

  // Tab filters for the two dashboard panels
  const [activePolicyTab, setActivePolicyTab] = useState('All');
  const [activeSchemeTab, setActiveSchemeTab] = useState('All');

  // Review modal state
  const [reviewModal, setReviewModal] = useState({ open: false, item: null, type: null });

  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab'); // 'policies' | 'schemes'

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const getCategoryIcon = (category) => {
    const icons = {
      'Education': GraduationCap,
      'Healthcare': HeartPulse,
      'Technology': Globe,
      'Environment': CloudSun,
      'Security': ShieldAlert,
      'Finance': Coins,
      'Employment': Briefcase,
      'Agriculture': Sprout,
    };
    return icons[category] || FileText;
  };

  const getCategoryStyles = (category) => {
    const styles = {
      'Education': { bg: '#faf5ff', color: '#a855f7' },
      'Healthcare': { bg: '#fff1f2', color: '#e11d48' },
      'Technology': { bg: '#eff6ff', color: '#2563eb' },
      'Environment': { bg: '#f0fdf4', color: '#16a34a' },
      'Security': { bg: '#faf5ff', color: '#a855f7' },
      'Finance': { bg: '#fff7ed', color: '#ea580c' },
      'Employment': { bg: '#fff7ed', color: '#ea580c' },
      'Agriculture': { bg: '#f0fdf4', color: '#16a34a' },
    };
    return styles[category] || { bg: '#faf5ff', color: '#a855f7' };
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    try {
      const [statsRes, pendingPolRes, pendingSchRes, activityRes] = await Promise.all([
        fetch(`${API}/volunteer/dashboard`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).catch(() => null),
        fetch(`${API}/volunteer/reviews/policies`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).catch(() => null),
        fetch(`${API}/volunteer/reviews/schemes`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).catch(() => null),
        fetch(`${API}/volunteer/reviews/recent`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).catch(() => null),
      ]);

      if (statsRes?.success) setStats(statsRes.data);

      if (pendingPolRes?.success && Array.isArray(pendingPolRes.data)) {
        setPendingPolicies(
          pendingPolRes.data.map((p, i) => ({
            id: p._id,
            name: p.name || p.title,
            category: p.category || '—',
            department: p.department,
            submittedAgo: timeSince(p.updatedAt),
            priority: p.priority || 'Medium',
            icon: [GraduationCap, Globe, CloudSun, ShieldAlert, Activity][i % 5],
            iconBg: ['bg-purple-50 text-purple-600', 'bg-blue-50 text-blue-600', 'bg-teal-50 text-teal-600', 'bg-indigo-50 text-indigo-600', 'bg-rose-50 text-rose-600'][i % 5],
          }))
        );
      }

      if (pendingSchRes?.success && Array.isArray(pendingSchRes.data)) {
        setPendingSchemes(
          pendingSchRes.data.map((s, i) => ({
            id: s._id,
            name: s.title || s.name,
            category: s.category || '—',
            department: s.department,
            submittedAgo: timeSince(s.updatedAt),
            priority: s.priority || 'Medium',
            icon: [Sprout, Home, HeartPulse, Briefcase, Coins][i % 5],
            iconBg: ['bg-green-50 text-green-600', 'bg-blue-50 text-blue-600', 'bg-rose-50 text-rose-600', 'bg-purple-50 text-purple-600', 'bg-amber-50 text-amber-600'][i % 5],
          }))
        );
      }

      if (activityRes?.success && Array.isArray(activityRes.data)) {
        setRecentActivity(
          activityRes.data.map((r) => ({
            id: r._id,
            action: r.action === 'approve' ? 'Approved' : 'Requested Changes',
            itemType: r.itemType === 'scheme' ? 'Scheme' : 'Policy',
            itemName: r.itemName || r.itemId,
            actionBy: 'You',
            time: timeSince(r.createdAt),
            status: r.action === 'approve' ? 'Approved' : 'Changes Requested',
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFullLists = async () => {
    try {
      const schemesData = await schemeService.getAll();
      setAllSchemes(schemesData || []);
    } catch (err) {
      console.error(err);
    }

    try {
      const policiesData = await policyService.getAll();
      setAllPolicies(policiesData || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchFullLists();
  }, []);

  // Reset pagination on tab change
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
    setSelectedDept('All Departments');
    setSelectedStatus('All Status');
  }, [activeTab]);

  const handleOpenReview = (item, type) => {
    setReviewModal({ open: true, item: { id: item.id || item._id, name: item.name || item.title || item.itemName, ...item }, type });
  };

  const handleOpenView = async (item, type) => {
    try {
      const details = type === 'policy' 
        ? await policyService.getById(item._id || item.id)
        : await schemeService.getById(item._id || item.id);
      setSelectedDetailsItem(details);
      setDetailsType(type);
      setIsViewOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitReview = async (action, comment) => {
    const { item, type } = reviewModal;
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    try {
      await fetch(`${API}/volunteer/reviews/${type}/${item.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action, comment }),
      });
    } catch (_) {}

    // Refresh lists and state
    fetchDashboardData();
    fetchFullLists();
    setReviewModal({ open: false, item: null, type: null });
  };

  // Dashboard filtering logic
  const filteredPendingPolicies = pendingPolicies.filter((p) => {
    if (activePolicyTab === 'All') return true;
    return p.priority === activePolicyTab;
  });

  const filteredPendingSchemes = pendingSchemes.filter((s) => {
    if (activeSchemeTab === 'All') return true;
    return s.priority === activeSchemeTab;
  });

  // Tab View Schemes Filtering
  let tabSchemes = allSchemes.filter(s => {
    const q = searchQuery.toLowerCase();
    const nameStr = (s.name || s.title || '').toLowerCase();
    const deptStr = (s.department || '').toLowerCase();
    const matchSearch = !q || nameStr.includes(q) || deptStr.includes(q);
    const matchDept = selectedDept === 'All Departments' || s.department === selectedDept;
    const matchStatus = selectedStatus === 'All Status' || s.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  if (selectedSort === 'A–Z') tabSchemes = [...tabSchemes].sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''));
  if (selectedSort === 'Z–A') tabSchemes = [...tabSchemes].sort((a, b) => (b.name || b.title || '').localeCompare(a.name || a.title || ''));
  if (selectedSort === 'Oldest') tabSchemes = [...tabSchemes].reverse();

  const totalTabSchemes = tabSchemes.length;
  const schemeTotalPages = Math.ceil(totalTabSchemes / PAGE_SIZE) || 1;
  const paginatedSchemes = tabSchemes.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const schemePageNums = Array.from({ length: Math.min(schemeTotalPages, 5) }, (_, i) => i + 1);

  // Tab View Policies Filtering
  let tabPolicies = allPolicies.filter(p => {
    const q = searchQuery.toLowerCase();
    const nameStr = (p.name || '').toLowerCase();
    const deptStr = (p.department || '').toLowerCase();
    const matchSearch = !q || nameStr.includes(q) || deptStr.includes(q);
    const matchDept = selectedDept === 'All Departments' || p.department === selectedDept;
    const matchStatus = selectedStatus === 'All Status' || p.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  if (selectedSort === 'A–Z') tabPolicies = [...tabPolicies].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  if (selectedSort === 'Z–A') tabPolicies = [...tabPolicies].sort((a, b) => (b.name || '').localeCompare(a.name || ''));
  if (selectedSort === 'Oldest') tabPolicies = [...tabPolicies].reverse();

  const totalTabPolicies = tabPolicies.length;
  const policyTotalPages = Math.ceil(totalTabPolicies / PAGE_SIZE) || 1;
  const paginatedPolicies = tabPolicies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const policyPageNums = Array.from({ length: Math.min(policyTotalPages, 5) }, (_, i) => i + 1);

  return (
    <div className="h-screen flex overflow-hidden bg-cream font-body">
      {/* Sidebar */}
      <VolunteerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        notifCount={5}
      />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <VolunteerHeader onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8">

          {/* RENDER TAB: SCHEMES */}
          {activeTab === 'schemes' && (
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6 text-emerald-500" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-[26px] font-bold text-gray-900 font-heading leading-tight">
                    Scheme Reviews
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Review and verify all scheme and benefit program documentation.
                  </p>
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search schemes..."
                      value={searchQuery}
                      onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition"
                    />
                  </div>
                  <LocalDropdown
                    value={selectedDept}
                    options={SCHEME_DEPARTMENTS}
                    onChange={v => { setSelectedDept(v); setCurrentPage(1); }}
                  />
                  <LocalDropdown
                    value={selectedStatus}
                    options={STATUS_OPTIONS}
                    onChange={v => { setSelectedStatus(v); setCurrentPage(1); }}
                  />
                  <LocalDropdown
                    value={`Sort by: ${selectedSort}`}
                    options={SORT_OPTIONS}
                    onChange={v => setSelectedSort(v)}
                    prefix={<SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />}
                  />
                </div>

                {/* Table */}
                <div className="mx-5 mb-4 border border-gray-100 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#FAF3E8] border-b border-gray-100">
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-5 py-3 whitespace-nowrap">Scheme Name</th>
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Department</th>
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Launch Date</th>
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Status</th>
                          <th className="text-center text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedSchemes.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-16 text-center text-gray-400 text-sm font-medium">No schemes found matching your filters.</td>
                          </tr>
                        ) : (
                          paginatedSchemes.map((scheme, idx) => {
                            const Icon = getCategoryIcon(scheme.category || 'Technology');
                            const styles = getCategoryStyles(scheme.category || 'Technology');
                            const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-cream';
                            return (
                              <tr key={scheme._id || scheme.id} className={`border-b border-gray-100 ${rowBg} ${idx === paginatedSchemes.length - 1 ? 'border-b-0' : ''}`}>
                                <td className="px-5 py-4 min-w-[240px]">
                                  <div className="flex items-start gap-3">
                                    <div style={{ background: styles.bg }} className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                      <Icon style={{ color: styles.color, width: 18, height: 18 }} strokeWidth={2} />
                                    </div>
                                    <div className="self-center">
                                      <p className="text-sm font-semibold text-gray-900 leading-snug">{scheme.name || scheme.title}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 min-w-[160px] max-w-[200px]">
                                  <p className="text-sm text-gray-600 leading-snug">{scheme.department}</p>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <p className="text-sm text-gray-600">{scheme.launchDate || scheme.publishedDate || 'Ongoing'}</p>
                                </td>
                                <td className="px-4 py-4">
                                  <StatusBadge status={scheme.status} />
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center gap-1.5 justify-center flex-wrap">
                                    <button
                                      onClick={() => handleOpenView(scheme, 'scheme')}
                                      className="flex items-center gap-1.5 border border-orange-200 bg-orange-50 text-[#ea580c] rounded-lg px-3 py-1.5 text-[12px] font-semibold transition cursor-pointer hover:brightness-95 active:scale-95"
                                    >
                                      <Eye className="w-3.5 h-3.5" /> View
                                    </button>
                                    {scheme.status === 'Under Review' && (
                                      <button
                                        onClick={() => handleOpenReview(scheme, 'scheme')}
                                        className="flex items-center gap-1.5 border border-blue-200 bg-blue-50 text-[#2563eb] rounded-lg px-3 py-1.5 text-[12px] font-semibold transition cursor-pointer hover:brightness-95 active:scale-95"
                                      >
                                        <CheckCircle className="w-3.5 h-3.5" /> Review
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <p className="text-sm text-gray-500">
                    Showing {totalTabSchemes === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to{' '}
                    {Math.min(currentPage * PAGE_SIZE, totalTabSchemes)} of {totalTabSchemes} schemes
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="px-3 py-1.5 text-sm text-gray-500 disabled:text-gray-300 hover:text-gray-800 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    {schemePageNums.map(n => (
                      <button
                        key={n}
                        onClick={() => setCurrentPage(n)}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                          currentPage === n ? 'bg-[#F2762E] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === schemeTotalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="px-3 py-1.5 text-sm font-semibold text-[#F2762E] disabled:text-gray-300 hover:text-orange-700 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* RENDER TAB: POLICIES */}
          {activeTab === 'policies' && (
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-purple-500" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-[26px] font-bold text-gray-900 font-heading leading-tight">
                    Policy Reviews
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Review and verify all policy documentation.
                  </p>
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search policies..."
                      value={searchQuery}
                      onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition"
                    />
                  </div>
                  <LocalDropdown
                    value={selectedDept}
                    options={POLICY_DEPARTMENTS}
                    onChange={v => { setSelectedDept(v); setCurrentPage(1); }}
                  />
                  <LocalDropdown
                    value={selectedStatus}
                    options={STATUS_OPTIONS}
                    onChange={v => { setSelectedStatus(v); setCurrentPage(1); }}
                  />
                  <LocalDropdown
                    value={`Sort by: ${selectedSort}`}
                    options={SORT_OPTIONS}
                    onChange={v => setSelectedSort(v)}
                    prefix={<SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />}
                  />
                </div>

                {/* Table */}
                <div className="mx-5 mb-4 border border-gray-100 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#FAF3E8] border-b border-gray-100">
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-5 py-3 whitespace-nowrap">Policy Name</th>
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Department</th>
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Effective Date</th>
                          <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Status</th>
                          <th className="text-center text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedPolicies.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-16 text-center text-gray-400 text-sm font-medium">No policies found matching your filters.</td>
                          </tr>
                        ) : (
                          paginatedPolicies.map((policy, idx) => {
                            const Icon = getCategoryIcon(policy.category || 'Technology');
                            const styles = getCategoryStyles(policy.category || 'Technology');
                            const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-cream';
                            return (
                              <tr key={policy._id || policy.id} className={`border-b border-gray-100 ${rowBg} ${idx === paginatedPolicies.length - 1 ? 'border-b-0' : ''}`}>
                                <td className="px-5 py-4 min-w-[240px]">
                                  <div className="flex items-start gap-3">
                                    <div style={{ background: styles.bg }} className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                      <Icon style={{ color: styles.color, width: 18, height: 18 }} strokeWidth={2} />
                                    </div>
                                    <div className="self-center">
                                      <p className="text-sm font-semibold text-gray-900 leading-snug">{policy.name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 min-w-[160px] max-w-[200px]">
                                  <p className="text-sm text-gray-600 leading-snug">{policy.department}</p>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <p className="text-sm text-gray-600">{policy.effectiveDate || policy.date || 'N/A'}</p>
                                </td>
                                <td className="px-4 py-4">
                                  <StatusBadge status={policy.status} />
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center gap-1.5 justify-center flex-wrap">
                                    <button
                                      onClick={() => handleOpenView(policy, 'policy')}
                                      className="flex items-center gap-1.5 border border-orange-200 bg-orange-50 text-[#ea580c] rounded-lg px-3 py-1.5 text-[12px] font-semibold transition cursor-pointer hover:brightness-95 active:scale-95"
                                    >
                                      <Eye className="w-3.5 h-3.5" /> View
                                    </button>
                                    {policy.status === 'Under Review' && (
                                      <button
                                        onClick={() => handleOpenReview(policy, 'policy')}
                                        className="flex items-center gap-1.5 border border-blue-200 bg-blue-50 text-[#2563eb] rounded-lg px-3 py-1.5 text-[12px] font-semibold transition cursor-pointer hover:brightness-95 active:scale-95"
                                      >
                                        <CheckCircle className="w-3.5 h-3.5" /> Review
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <p className="text-sm text-gray-500">
                    Showing {totalTabPolicies === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to{' '}
                    {Math.min(currentPage * PAGE_SIZE, totalTabPolicies)} of {totalTabPolicies} policies
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="px-3 py-1.5 text-sm text-gray-500 disabled:text-gray-300 hover:text-gray-800 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    {policyPageNums.map(n => (
                      <button
                        key={n}
                        onClick={() => setCurrentPage(n)}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                          currentPage === n ? 'bg-[#F2762E] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === policyTotalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="px-3 py-1.5 text-sm font-semibold text-[#F2762E] disabled:text-gray-300 hover:text-orange-700 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* RENDER DEFAULT: DASHBOARD VIEW */}
          {!activeTab && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* Welcome Banner */}
              <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-gradient-to-r from-[#F7D2A8] via-white to-[#D8F3E3] border border-[#E2E8F0] p-6 shadow-sm gap-4">
                <div>
                  <p className="mb-1 text-[13px] text-gray-500 font-medium">Welcome back,</p>
                  <h1 className="flex items-center gap-2 font-heading text-[28px] font-bold text-gray-900 leading-tight">
                    Volunteer Reviewer 👋
                  </h1>
                  <p className="mt-2 text-sm text-gray-500 font-normal">
                    Review policies and schemes to help keep information accurate and reliable.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 bg-white/70 border border-gray-100 rounded-xl px-4 py-3">
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Today's Date</p>
                    <p className="text-[15px] font-bold text-gray-800 mt-0.5">{today}</p>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#F2762E] flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </section>

              {/* Stats Grid */}
              <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                <VolunteerStatCard
                  icon={<FileText size={20} className="text-[#F2762E]" />}
                  iconBg="bg-orange-50"
                  value={stats.pendingPolicies}
                  label="Policies Pending"
                  sublabel="Requires your review"
                  sublabelColor="text-[#F2762E] font-semibold"
                />
                <VolunteerStatCard
                  icon={<Layers size={20} className="text-emerald-500" />}
                  iconBg="bg-emerald-50"
                  value={stats.pendingSchemes}
                  label="Schemes Pending"
                  sublabel="Requires your review"
                  sublabelColor="text-[#F2762E] font-semibold"
                />
                <VolunteerStatCard
                  icon={<CheckCircle size={20} className="text-emerald-500" />}
                  iconBg="bg-emerald-50"
                  value={stats.approvedThisMonth}
                  label="Approved"
                  sublabel="This month"
                  sublabelColor="text-emerald-500 font-semibold"
                />
                <VolunteerStatCard
                  icon={<XCircle size={20} className="text-rose-500" />}
                  iconBg="bg-rose-50"
                  value={stats.changesThisMonth}
                  label="Changes Requested"
                  sublabel="This month"
                  sublabelColor="text-rose-500 font-semibold"
                />
                <VolunteerStatCard
                  icon={<Clock size={20} className="text-violet-500" />}
                  iconBg="bg-violet-50"
                  value={stats.totalReviewed}
                  label="Total Reviewed"
                  sublabel="This month"
                  sublabelColor="text-violet-500 font-semibold"
                />
              </section>

              {/* Review Tables Grid */}
              <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Pending Scheme Reviews */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">Pending Scheme Reviews</h2>
                      <span className="bg-[#F2762E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {pendingSchemes.length}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                    {['All', 'High', 'Medium', 'Low'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveSchemeTab(tab)}
                        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                          activeSchemeTab === tab
                            ? 'bg-orange-50 border-[#F2762E] text-[#F2762E]'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {tab === 'All' ? 'All Schemes' : `${tab} Priority`}
                      </button>
                    ))}
                  </div>

                  <div className="mb-5 flex flex-col gap-3">
                    {filteredPendingSchemes.length > 0 ? (
                      filteredPendingSchemes.map((item) => (
                        <ReviewItemCard key={item.id} item={item} type="scheme" onReview={handleOpenReview} />
                      ))
                    ) : (
                      <div className="rounded-2xl border border-gray-100 bg-[#F7F2E8]/30 p-8 text-center">
                        <CheckCircle className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium">All schemes reviewed!</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-center">
                    <Button
                      variant="primary"
                      icon={<ArrowRight size={16} />}
                      onClick={() => navigate('/volunteer/dashboard?tab=schemes')}
                    >
                      View All Pending Scheme Reviews
                    </Button>
                  </div>
                </div>
              

                {/* Pending Policy Reviews */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">Pending Policy Reviews</h2>
                      <span className="bg-[#F2762E] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {pendingPolicies.length}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                    {['All', 'High', 'Medium', 'Low'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActivePolicyTab(tab)}
                        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                          activePolicyTab === tab
                            ? 'bg-orange-50 border-[#F2762E] text-[#F2762E]'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {tab === 'All' ? 'All Policies' : `${tab} Priority`}
                      </button>
                    ))}
                  </div>

                  <div className="mb-5 flex flex-col gap-3">
                    {filteredPendingPolicies.length > 0 ? (
                      filteredPendingPolicies.map((item) => (
                        <ReviewItemCard key={item.id} item={item} type="policy" onReview={handleOpenReview} />
                      ))
                    ) : (
                      <div className="rounded-2xl border border-gray-100 bg-[#F7F2E8]/30 p-8 text-center">
                        <CheckCircle className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium">All policies reviewed!</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-center">
                    <Button
                      variant="primary"
                      icon={<ArrowRight size={16} />}
                      onClick={() => navigate('/volunteer/dashboard?tab=policies')}
                    >
                      View All Pending Policy Reviews
                    </Button>
                  </div>
                </div>
</section>

              {/* Recent Activity */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="font-heading text-[16px] font-bold text-gray-900">Recent Activity</h2>
                  <button className="text-[13px] font-semibold text-[#F2762E] hover:underline cursor-pointer">
                    View all
                  </button>
                </div>
                <div className="px-6 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider pr-6">Action</th>
                        <th className="py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider pr-6">Item Type</th>
                        <th className="py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider pr-6">Item Name</th>
                        <th className="py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider pr-6">Action By</th>
                        <th className="py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider pr-6">Time</th>
                        <th className="py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider pr-6">Status</th>
                        <th className="py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((item) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-orange-50/40 transition-colors">
                          <td className="py-3 pr-6">
                            <div className="flex items-center gap-2">
                              {item.action === 'Approved' ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-[#F2762E] shrink-0" />
                              )}
                              <span className="text-[13px] font-medium text-gray-700">{item.action}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-6"><TypeTag type={item.itemType} /></td>
                          <td className="py-3 pr-6">
                            <span className="text-[13px] font-medium text-gray-700">{item.itemName}</span>
                          </td>
                          <td className="py-3 pr-6">
                            <span className="text-[13px] text-gray-500">{item.actionBy}</span>
                          </td>
                          <td className="py-3 pr-6">
                            <span className="text-[12px] text-gray-400">{item.time}</span>
                          </td>
                          <td className="py-3 pr-6"><StatusBadge status={item.status} /></td>
                          <td className="py-3">
                            <button
                              onClick={() => handleOpenView(item, item.itemType === 'Scheme' ? 'scheme' : 'policy')}
                              className="text-[13px] font-semibold text-[#F2762E] hover:underline cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* ─────────────── View Details Modal ─────────────── */}
      {isViewOpen && selectedDetailsItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsViewOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div
                style={{ background: getCategoryStyles(selectedDetailsItem.category || 'Technology').bg }}
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              >
                {React.createElement(getCategoryIcon(selectedDetailsItem.category || 'Technology'), {
                  style: { color: getCategoryStyles(selectedDetailsItem.category || 'Technology').color, width: 24, height: 24 }
                })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">{selectedDetailsItem.name || selectedDetailsItem.title}</h3>
                <p className="text-xs text-gray-500 font-medium">{selectedDetailsItem.category || 'Government Policy'} • {selectedDetailsItem.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Status</span>
                <StatusBadge status={selectedDetailsItem.status} />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">Launch / Effective Date</span>
                <span className="text-sm font-semibold text-gray-700">{selectedDetailsItem.launchDate || selectedDetailsItem.effectiveDate || selectedDetailsItem.date || 'N/A'}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Description</span>
              <p className="text-sm text-gray-600 leading-relaxed bg-cream p-4 rounded-xl border border-gray-100">
                {selectedDetailsItem.description || 'No description provided.'}
              </p>
            </div>

            {detailsType === 'scheme' && selectedDetailsItem.benefits && selectedDetailsItem.benefits.length > 0 && (
              <div className="mb-6">
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">Key Benefits</span>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {selectedDetailsItem.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {detailsType === 'scheme' && selectedDetailsItem.documentsRequired && selectedDetailsItem.documentsRequired.length > 0 && (
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">Required Documents</span>
                <div className="flex flex-wrap gap-2">
                  {selectedDetailsItem.documentsRequired.map((doc, i) => (
                    <span key={i} className="text-xs bg-orange-50 text-[#F2762E] font-semibold border border-orange-100 px-3 py-1 rounded-full">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal.open && (
        <ReviewModal
          item={reviewModal.item}
          type={reviewModal.type}
          onClose={() => setReviewModal({ open: false, item: null, type: null })}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}

/* ─── Helper ──────────────────────────────────────────────────────────── */
function timeSince(dateStr) {
  if (!dateStr) return '—';
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}
