import React, { useState, useEffect } from 'react';
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
  Trash2
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { policyService } from '../../services/policyService';

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

/* ─────────────── Icon Mapping Utilities ─────────────── */
const categoryIcons = {
  'Education': GraduationCap,
  'Healthcare': Activity,
  'Technology': Globe,
  'Environment': CloudSun,
  'Security': Shield,
  'Finance': Shield,
  'Employment': Briefcase,
  'Commerce & Industry': Briefcase,
};

const getCategoryIcon = (category) => {
  return categoryIcons[category] || FileText;
};

const getCategoryStyles = (category) => {
  const map = {
    'Education': { bg: '#faf5ff', color: '#a855f7' },
    'Healthcare': { bg: '#fff1f2', color: '#e11d48' },
    'Technology': { bg: '#eff6ff', color: '#2563eb' },
    'Environment': { bg: '#f0fdf4', color: '#16a34a' },
    'Security': { bg: '#faf5ff', color: '#a855f7' },
    'Finance': { bg: '#fff7ed', color: '#ea580c' },
    'Employment': { bg: '#fff7ed', color: '#ea580c' },
    'Commerce & Industry': { bg: '#fff7ed', color: '#ea580c' },
  };
  return map[category] || { bg: '#faf5ff', color: '#a855f7' };
};

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
function ActionBtn({ icon, label, color, onClick }) {
  const colorMap = {
    orange: { bg: '#fff7ed', border: '#fed7aa', text: '#ea580c' },
    blue:   { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' },
    red:    { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
    green:  { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  };
  const c = colorMap[color] || colorMap.orange;
  return (
    <button
      onClick={onClick}
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

/* ─────────────── Main Page ─────────────── */
export default function PolicyManagement() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  // State for live backend data
  const [policiesList, setPoliciesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search, Filters & Pagination
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sort, setSort] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Action States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [toast, setToast] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    category: '',
    effectiveDate: '',
    status: 'Draft',
    description: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAllPolicies = async () => {
    try {
      setLoading(true);
      const data = await policyService.getAll();
      setPoliciesList(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load policies from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPolicies();
  }, []);

  const handleView = async (policy) => {
    try {
      const details = await policyService.getById(policy._id || policy.id);
      setSelectedPolicy(details);
      setIsViewOpen(true);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch policy details.', 'error');
    }
  };

  const openAddForm = () => {
    setFormData({
      id: '',
      name: '',
      department: '',
      category: 'Technology', // Default category for policies
      effectiveDate: '',
      status: 'Draft',
      description: ''
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (policy) => {
    setFormData({
      id: policy._id || policy.id,
      name: policy.name || '',
      department: policy.department || '',
      category: policy.category || 'Technology',
      effectiveDate: policy.effectiveDate || policy.date || '',
      status: policy.status || 'Draft',
      description: policy.description || ''
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.department) {
      setFormError('Please fill out all required fields (*)');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        name: formData.name,
        department: formData.department,
        category: formData.category,
        effectiveDate: formData.effectiveDate,
        status: formData.status,
        description: formData.description
      };

      if (formData.id) {
        await policyService.update(formData.id, payload);
        showToast('Policy updated successfully!');
      } else {
        await policyService.create(payload);
        showToast('New policy added successfully!');
      }
      setIsFormOpen(false);
      fetchAllPolicies();
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || 'Error occurred while saving.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await policyService.update(id, { status });
      showToast(`Policy status updated to ${status}!`);
      fetchAllPolicies();
    } catch (err) {
      console.error(err);
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this policy?')) return;
    try {
      await policyService.remove(id);
      showToast('Policy deleted successfully.');
      fetchAllPolicies();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete policy.', 'error');
    }
  };

  /* Filter */
  let policies = policiesList.filter(p => {
    const q = search.toLowerCase();
    const nameStr = (p.name || '').toLowerCase();
    const deptStr = (p.department || '').toLowerCase();
    const matchSearch = !q || nameStr.includes(q) || deptStr.includes(q);
    const matchDept = department === 'All Departments' || p.department === department;
    const matchStatus = statusFilter === 'All Status' || p.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  /* Sort */
  if (sort === 'A–Z') policies = [...policies].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  if (sort === 'Z–A') policies = [...policies].sort((a, b) => (b.name || '').localeCompare(a.name || ''));
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
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-[#F2762E] hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
            >
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
                options={SORT_OPTIONS}
                onChange={v => setSort(v)}
                prefix={<SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />}
              />
            </div>

            {/* Table */}
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
                        Effective Date
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-gray-400 text-sm font-medium">
                          Loading policies...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-red-500 text-sm font-medium">
                          {error}
                        </td>
                      </tr>
                    ) : paginated.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-gray-400 text-sm font-medium">
                          No policies found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      paginated.map((policy, idx) => {
                        const Icon = getCategoryIcon(policy.category || 'Technology');
                        const styles = getCategoryStyles(policy.category || 'Technology');
                        const isApproved = policy.status === 'Approved';
                        const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-cream';
                        return (
                          <tr
                            key={policy._id || policy.id}
                            className={`border-b border-gray-100 ${rowBg} ${
                              idx === paginated.length - 1 ? 'border-b-0' : ''
                            }`}
                          >
                            {/* Policy Name */}
                            <td className="px-5 py-4 min-w-[240px]">
                              <div className="flex items-start gap-3">
                                <div
                                  style={{ background: styles.bg }}
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                >
                                  <Icon style={{ color: styles.color, width: 18, height: 18 }} strokeWidth={2} />
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
                              <p className="text-sm text-gray-600">{policy.effectiveDate || policy.date || 'N/A'}</p>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                              <StatusBadge status={policy.status} />
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5 justify-center flex-wrap">
                                <ActionBtn icon={<Eye style={{ width: 13, height: 13 }} />} label="View" color="orange" onClick={() => handleView(policy)} />
                                <ActionBtn icon={<Pencil style={{ width: 13, height: 13 }} />} label="Edit" color="blue" onClick={() => openEditForm(policy)} />
                                {isApproved && (
                                  <ActionBtn icon={<Upload style={{ width: 13, height: 13 }} />} label="Publish" color="green" onClick={() => handleStatusChange(policy._id || policy.id, 'Published')} />
                                )}
                                {policy.status === 'Published' && (
                                  <ActionBtn icon={<Archive style={{ width: 13, height: 13 }} />} label="Archive" color="red" onClick={() => handleStatusChange(policy._id || policy.id, 'Archived')} />
                                )}
                                <ActionBtn icon={<Trash2 style={{ width: 13, height: 13 }} />} label="Delete" color="red" onClick={() => handleDelete(policy._id || policy.id)} />
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

      {/* ─────────────── View Details Modal ─────────────── */}
      {isViewOpen && selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsViewOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div
                style={{ background: getCategoryStyles(selectedPolicy.category || 'Technology').bg }}
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              >
                {React.createElement(getCategoryIcon(selectedPolicy.category || 'Technology'), {
                  style: { color: getCategoryStyles(selectedPolicy.category || 'Technology').color, width: 24, height: 24 }
                })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">{selectedPolicy.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{selectedPolicy.category || 'Government Policy'} • {selectedPolicy.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">Status</span>
                <StatusBadge status={selectedPolicy.status} />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">Effective Date</span>
                <span className="text-sm font-semibold text-gray-700">{selectedPolicy.effectiveDate || selectedPolicy.date || 'N/A'}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Description</span>
              <p className="text-sm text-gray-600 leading-relaxed bg-cream p-4 rounded-xl border border-gray-100">
                {selectedPolicy.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────── Add / Edit Modal ─────────────── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-6">
              {formData.id ? 'Edit Policy' : 'Add New Policy'}
            </h3>

            {formError && (
              <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Policy Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. National Education Policy 2020"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.filter(d => d !== 'All Departments').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category / Sector</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                  >
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Technology">Technology</option>
                    <option value="Environment">Environment</option>
                    <option value="Security">Security</option>
                    <option value="Finance">Finance</option>
                    <option value="Employment">Employment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Effective Date</label>
                  <input
                    type="text"
                    value={formData.effectiveDate}
                    onChange={e => setFormData({ ...formData, effectiveDate: e.target.value })}
                    placeholder="e.g. 29 Jul 2020"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the policy objectives..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#F2762E] hover:bg-orange-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : 'Save Policy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────── Alert Toast ─────────────── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 shadow-lg border text-sm font-semibold transition-all duration-300 animate-slide-in ${
          toast.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {toast.type === 'success' ? '✓' : '⚠️'} {toast.message}
        </div>
      )}
    </div>
  );
}
