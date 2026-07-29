import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Archive,
  MoreVertical,
  Upload,
  ChevronDown,
  SlidersHorizontal,
  FileText,
  GraduationCap,
  Activity,
  Globe,
  CloudSun,
  Shield,
  Briefcase,
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

/* ─────────────── Data ─────────────── */
const ALL_POLICIES = [
  {
    id: 1,
    name: 'National Education Policy 2020',
    description: "Transforming India's education system for 21st century needs.",
    department: 'Ministry of Education',
    date: '29 Jul 2020',
    status: 'Published',
    lastUpdated: '2 days ago',
    icon: GraduationCap,
    iconBg: '#faf5ff',
    iconColor: '#a855f7',
  },
  {
    id: 2,
    name: 'National Health Policy 2017',
    description: 'Universal, accessible and affordable healthcare for all.',
    department: 'Ministry of Health & Family Welfare',
    date: '16 Mar 2017',
    status: 'Under Review',
    lastUpdated: '1 day ago',
    icon: Activity,
    iconBg: '#fff1f2',
    iconColor: '#e11d48',
  },
  {
    id: 3,
    name: 'Digital India Policy',
    description: 'Power to empower – Digital infrastructure for a new India.',
    department: 'Ministry of Electronics & IT',
    date: '01 Jul 2015',
    status: 'Published',
    lastUpdated: '3 days ago',
    icon: Globe,
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
  },
  {
    id: 4,
    name: 'Climate Change Action Plan',
    description: 'Building a sustainable and climate-resilient India.',
    department: 'Ministry of Environment',
    date: '12 Aug 2019',
    status: 'Approved',
    lastUpdated: '4 hours ago',
    icon: CloudSun,
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
  },
  {
    id: 5,
    name: 'Data Protection Policy',
    description: 'Ensuring privacy, security and responsible data governance.',
    department: 'Ministry of Electronics & IT',
    date: '24 Nov 2022',
    status: 'Under Review',
    lastUpdated: '6 days ago',
    icon: Shield,
    iconBg: '#faf5ff',
    iconColor: '#a855f7',
  },
  {
    id: 6,
    name: 'Make in India Policy',
    description: 'Strengthening manufacturing and boosting economic growth.',
    department: 'Ministry of Commerce & Industry',
    date: '25 Sep 2014',
    status: 'Archived',
    lastUpdated: '1 week ago',
    icon: Briefcase,
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
  },
];

const DEPARTMENTS = [
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

/* ─────────────── Status Badge ─────────────── */
function StatusBadge({ status }) {
  const map = {
    Published:     { dotCls: 'bg-green-400',  cls: 'bg-green-50 text-green-700 border border-green-200/30' },
    'Under Review':{ dotCls: 'bg-amber-400',  cls: 'bg-amber-50 text-amber-700 border border-amber-200/30' },
    Draft:         { dotCls: 'bg-blue-400',   cls: 'bg-blue-50 text-blue-700 border border-blue-200/30' },
    Archived:      { dotCls: 'bg-gray-400',   cls: 'bg-gray-100 text-gray-600 border border-gray-200/30' },
    Approved:      { dotCls: 'bg-green-400',  cls: 'bg-green-50 text-green-700 border border-green-200/30' },
  };
  const cfg = map[status] || map['Draft'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dotCls}`} />
      {status}
    </span>
  );
}

/* ─────────────── Action Button ─────────────── */
function ActionBtn({ icon, label, color }) {
  const colorMap = {
    orange: { bg: '#fff7ed', border: '#fed7aa', text: '#ea580c' },
    blue:   { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' },
    red:    { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
    green:  { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  };
  const c = colorMap[color] || colorMap.orange;
  return (
    <button
      style={{ backgroundColor: c.bg, borderColor: c.border, color: c.text }}
      className="flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all cursor-pointer hover:brightness-95 active:scale-95"
    >
      {icon}
      {label}
    </button>
  );
}

/* ─────────────── Dropdown ─────────────── */
function Dropdown({ value, options, onChange, prefix }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        {prefix}
        {value}
        <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[200px]">
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

/* ─────────────── Main Page ─────────────── */
export default function PolicyManagement() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sort, setSort] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);

  /* Filter */
  let policies = ALL_POLICIES.filter(p => {
    const q = search.toLowerCase();
    const matchSearch =
      !q || p.name.toLowerCase().includes(q) || p.department.toLowerCase().includes(q);
    const matchDept = department === 'All Departments' || p.department === department;
    const matchStatus = statusFilter === 'All Status' || p.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  /* Sort */
  if (sort === 'A–Z') policies = [...policies].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'Z–A') policies = [...policies].sort((a, b) => b.name.localeCompare(a.name));
  if (sort === 'Oldest') policies = [...policies].reverse();

  const totalPolicies = policies.length;
  const totalPages = Math.ceil(totalPolicies / PAGE_SIZE) || 1;
  const paginated = policies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const pageNums = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  return (
    <div className="h-screen flex overflow-hidden bg-cream font-body">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(p => !p)} />

        <main className="flex-1 min-w-0 overflow-y-auto px-6 py-6">
          {/* Page Header */}
          <div className="flex items-start justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-purple-500" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-[26px] font-bold text-gray-900 font-heading leading-tight">
                  Policy Management
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Create, review and manage all government policies across ministries and departments.
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-[#F2762E] hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shrink-0 shadow-sm">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Add New Policy
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mx-1">
            {/* Search + Filters Bar */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition"
                />
              </div>
              <Dropdown
                value={department}
                options={DEPARTMENTS}
                onChange={v => { setDepartment(v); setCurrentPage(1); }}
              />
              <Dropdown
                value={statusFilter}
                options={STATUS_OPTIONS}
                onChange={v => { setStatusFilter(v); setCurrentPage(1); }}
              />
              <Dropdown
                value={`Sort by: ${sort}`}
                options={SORT_OPTIONS.map(o => o)}
                onChange={v => setSort(v)}
                prefix={<SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />}
              />
            </div>

            {/* Table wrapper */}
            <div className="mx-5 mb-4 border border-gray-100 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#FAF3E8] border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-5 py-3 whitespace-nowrap">
                        Policy Name
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Department
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Date
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Last Updated
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-gray-400 text-sm font-medium">
                          No policies found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      paginated.map((policy, idx) => {
                        const Icon = policy.icon;
                        const isApproved = policy.status === 'Approved';
                        const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-cream';
                        return (
                          <tr
                            key={policy.id}
                            className={`border-b border-gray-100 ${rowBg} ${
                              idx === paginated.length - 1 ? 'border-b-0' : ''
                            }`}
                          >
                            {/* Policy Name */}
                            <td className="px-5 py-4 min-w-[240px]">
                              <div className="flex items-start gap-3">
                                <div
                                  style={{ background: policy.iconBg }}
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                >
                                  <Icon style={{ color: policy.iconColor, width: 18, height: 18 }} strokeWidth={2} />
                                </div>
                                <div className="self-center">
                                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                                    {policy.name}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="px-4 py-4 min-w-[160px] max-w-[200px]">
                              <p className="text-sm text-gray-600 leading-snug">{policy.department}</p>
                            </td>

                            {/* Date */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600">{policy.date}</p>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                              <StatusBadge status={policy.status} />
                            </td>

                            {/* Last Updated */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="text-xs text-gray-400 font-medium">{policy.lastUpdated}</p>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-4 min-w-[280px]">
                              <div className="flex items-center gap-1.5 justify-center flex-nowrap">
                                <ActionBtn icon={<Eye style={{ width: 13, height: 13 }} />} label="View" color="orange" />
                                <ActionBtn icon={<Pencil style={{ width: 13, height: 13 }} />} label="Edit" color="blue" />
                                {isApproved && (
                                  <ActionBtn icon={<Upload style={{ width: 13, height: 13 }} />} label="Publish" color="green" />
                                )}
                                <ActionBtn icon={<Archive style={{ width: 13, height: 13 }} />} label="Archive" color="red" />
                                <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors ml-0.5">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
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
                Showing {totalPolicies === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to{' '}
                {Math.min(currentPage * PAGE_SIZE, totalPolicies)} of {totalPolicies} policies
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-3 py-1.5 text-sm text-gray-500 disabled:text-gray-300 hover:text-gray-800 cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {pageNums.map(n => (
                  <button
                    key={n}
                    onClick={() => setCurrentPage(n)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      currentPage === n
                        ? 'bg-[#F2762E] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400 text-sm px-1">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                        currentPage === totalPages
                          ? 'bg-[#F2762E] text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-3 py-1.5 text-sm font-semibold text-[#F2762E] disabled:text-gray-300 hover:text-orange-700 cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
