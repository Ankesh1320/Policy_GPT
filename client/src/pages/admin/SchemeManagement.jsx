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
  Sprout,
  Home,
  Shield,
  Layers,
  HeartPulse,
  Briefcase,
  Lightbulb,
  CheckCircle2,
  Trash2,
  FileText
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { schemeService } from '../../services/schemeService';

const DEPARTMENTS = [
  'All Departments',
  'Ministry of Agriculture & Farmers Welfare',
  'Ministry of Housing & Urban Affairs',
  'Ministry of Women & Child Development',
  'Ministry of Health & Family Welfare',
  'Ministry of Finance',
  'Department for Promotion of Industry & Internal Trade',
  'Ministry of Electronics & Information Technology',
];

const STATUS_OPTIONS = ['All Status', 'Published', 'Under Review', 'Draft', 'Archived', 'Approved'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'A–Z', 'Z–A'];

const PAGE_SIZE = 7;

/* ─────────────── Icon Mapping Utilities ─────────────── */
const categoryIcons = {
  'Agriculture': Sprout,
  'Agriculture & Farming': Sprout,
  'Housing': Home,
  'Finance': Shield,
  'Security': Shield,
  'Healthcare': HeartPulse,
  'HealthCare & Medical': HeartPulse,
  'Employment': Briefcase,
  'Education': Lightbulb,
  'Education & Schloarship': Lightbulb,
  'Technology': Layers,
};

const getCategoryIcon = (category) => {
  return categoryIcons[category] || FileText;
};

const getCategoryStyles = (category) => {
  const map = {
    'Agriculture': { bg: '#f0fdf4', color: '#16a34a' },
    'Agriculture & Farming': { bg: '#f0fdf4', color: '#16a34a' },
    'Housing': { bg: '#eff6ff', color: '#2563eb' },
    'Finance': { bg: '#fff7ed', color: '#ea580c' },
    'Security': { bg: '#faf5ff', color: '#a855f7' },
    'Healthcare': { bg: '#fff1f2', color: '#e11d48' },
    'HealthCare & Medical': { bg: '#fff1f2', color: '#e11d48' },
    'Employment': { bg: '#fff7ed', color: '#ea580c' },
    'Education': { bg: '#faf5ff', color: '#a855f7' },
    'Education & Schloarship': { bg: '#faf5ff', color: '#a855f7' },
    'Technology': { bg: '#eff6ff', color: '#2563eb' },
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
export default function SchemeManagement() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  
  // State for live backend data
  const [schemesList, setSchemesList] = useState([]);
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
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [toast, setToast] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    category: '',
    launchDate: '',
    status: 'Draft',
    description: '',
    benefits: '',
    documentsRequired: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAllSchemes = async () => {
    try {
      setLoading(true);
      const data = await schemeService.getAll();
      setSchemesList(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load schemes from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSchemes();
  }, []);

  const handleView = async (scheme) => {
    try {
      const details = await schemeService.getById(scheme._id || scheme.id);
      setSelectedScheme(details);
      setIsViewOpen(true);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch scheme details.', 'error');
    }
  };

  const openAddForm = () => {
    setFormData({
      id: '',
      name: '',
      department: '',
      category: '',
      launchDate: '',
      status: 'Draft',
      description: '',
      benefits: '',
      documentsRequired: ''
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (scheme) => {
    setFormData({
      id: scheme._id || scheme.id,
      name: scheme.name || scheme.title || '',
      department: scheme.department || '',
      category: scheme.category || '',
      launchDate: scheme.launchDate || scheme.publishedDate || '',
      status: scheme.status || 'Draft',
      description: scheme.description || '',
      benefits: scheme.benefits ? scheme.benefits.join('\n') : '',
      documentsRequired: scheme.documentsRequired ? scheme.documentsRequired.join(', ') : ''
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.department || !formData.category) {
      setFormError('Please fill out all required fields (*)');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        name: formData.name,
        department: formData.department,
        category: formData.category,
        launchDate: formData.launchDate,
        status: formData.status,
        description: formData.description,
        benefits: formData.benefits.split('\n').map(b => b.trim()).filter(b => b.length > 0),
        documentsRequired: formData.documentsRequired.split(',').map(d => d.trim()).filter(d => d.length > 0)
      };

      if (formData.id) {
        await schemeService.update(formData.id, payload);
        showToast('Scheme updated successfully!');
      } else {
        await schemeService.create(payload);
        showToast('New scheme added successfully!');
      }
      setIsFormOpen(false);
      fetchAllSchemes();
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || 'Error occurred while saving.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await schemeService.update(id, { status });
      showToast(`Scheme status updated to ${status}!`);
      fetchAllSchemes();
    } catch (err) {
      console.error(err);
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scheme?')) return;
    try {
      await schemeService.remove(id);
      showToast('Scheme deleted successfully.');
      fetchAllSchemes();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete scheme.', 'error');
    }
  };

  /* Filter */
  let schemes = schemesList.filter(s => {
    const q = search.toLowerCase();
    const nameStr = (s.name || s.title || '').toLowerCase();
    const deptStr = (s.department || '').toLowerCase();
    const matchSearch = !q || nameStr.includes(q) || deptStr.includes(q);
    const matchDept = department === 'All Departments' || s.department === department;
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  /* Sort */
  if (sort === 'A–Z') schemes = [...schemes].sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''));
  if (sort === 'Z–A') schemes = [...schemes].sort((a, b) => (b.name || b.title || '').localeCompare(a.name || a.title || ''));
  if (sort === 'Oldest') schemes = [...schemes].reverse();

  const totalSchemes = schemes.length;
  const totalPages = Math.ceil(totalSchemes / PAGE_SIZE) || 1;
  const paginated = schemes.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
              <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6 text-[#16a34a]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-[26px] font-bold text-gray-900 font-heading leading-tight">
                  Scheme Management
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Manage and monitor all government schemes across departments.
                </p>
              </div>
            </div>
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-[#F2762E] hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Add New Scheme
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mx-1">
            {/* Search + Filters Bar */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-4 ">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schemes..."
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
                        Scheme Name
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Department
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 tracking-wide px-4 py-3 whitespace-nowrap">
                        Launch Date
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
                          Loading schemes...
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
                          No schemes found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      paginated.map((scheme, idx) => {
                        const Icon = getCategoryIcon(scheme.category);
                        const styles = getCategoryStyles(scheme.category);
                        const isApproved = scheme.status === 'Approved';
                        const isDraft = scheme.status === 'Draft' || scheme.status === 'Under Review' || scheme.status === 'Approved';
                        const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-cream';
                        return (
                          <tr
                            key={scheme._id || scheme.id}
                            className={`border-b border-gray-100 ${rowBg} ${
                              idx === paginated.length - 1 ? 'border-b-0' : ''
                            }`}
                          >
                            {/* Scheme Name */}
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
                                    {scheme.name || scheme.title}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="px-4 py-4 min-w-[160px] max-w-[200px]">
                              <p className="text-sm text-gray-600 leading-snug">{scheme.department}</p>
                            </td>

                            {/* Launch Date */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600">{scheme.launchDate || scheme.publishedDate || 'Ongoing'}</p>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                              <StatusBadge status={scheme.status} />
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5 justify-center flex-wrap">
                                <ActionBtn icon={<Eye style={{ width: 13, height: 13 }} />} label="View" color="orange" onClick={() => handleView(scheme)} />
                                <ActionBtn icon={<Pencil style={{ width: 13, height: 13 }} />} label="Edit" color="blue" onClick={() => openEditForm(scheme)} />
                                {isApproved && (
                                  <ActionBtn icon={<Upload style={{ width: 13, height: 13 }} />} label="Publish" color="green" onClick={() => handleStatusChange(scheme._id || scheme.id, 'Published')} />
                                )}
                                {scheme.status === 'Published' && (
                                  <ActionBtn icon={<Archive style={{ width: 13, height: 13 }} />} label="Archive" color="red" onClick={() => handleStatusChange(scheme._id || scheme.id, 'Archived')} />
                                )}
                                <ActionBtn icon={<Trash2 style={{ width: 13, height: 13 }} />} label="Delete" color="red" onClick={() => handleDelete(scheme._id || scheme.id)} />
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
                Showing {totalSchemes === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to{' '}
                {Math.min(currentPage * PAGE_SIZE, totalSchemes)} of {totalSchemes} schemes
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
      {isViewOpen && selectedScheme && (
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
                style={{ background: getCategoryStyles(selectedScheme.category).bg }}
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              >
                {React.createElement(getCategoryIcon(selectedScheme.category), {
                  style: { color: getCategoryStyles(selectedScheme.category).color, width: 24, height: 24 }
                })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">{selectedScheme.name || selectedScheme.title}</h3>
                <p className="text-xs text-gray-500 font-medium">{selectedScheme.category} • {selectedScheme.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">Status</span>
                <StatusBadge status={selectedScheme.status} />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">Launch Date</span>
                <span className="text-sm font-semibold text-gray-700">{selectedScheme.launchDate || selectedScheme.publishedDate || 'Ongoing'}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Description</span>
              <p className="text-sm text-gray-600 leading-relaxed bg-cream p-4 rounded-xl border border-gray-100">
                {selectedScheme.description || 'No description provided.'}
              </p>
            </div>

            {selectedScheme.benefits && selectedScheme.benefits.length > 0 && (
              <div className="mb-6">
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">Key Benefits</span>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {selectedScheme.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedScheme.documentsRequired && selectedScheme.documentsRequired.length > 0 && (
              <div>
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">Required Documents</span>
                <div className="flex flex-wrap gap-2">
                  {selectedScheme.documentsRequired.map((doc, i) => (
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
              {formData.id ? 'Edit Scheme' : 'Add New Scheme'}
            </h3>

            {formError && (
              <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Scheme Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. PM Kisan Samman Nidhi"
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
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                  >
                    <option value="">Select Category</option>
                    <option value="Agriculture">Agriculture & Farming</option>
                    <option value="Housing">Housing</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">HealthCare & Medical</option>
                    <option value="Employment">Employment</option>
                    <option value="Education">Education & Schloarship</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Launch Date</label>
                  <input
                    type="text"
                    value={formData.launchDate}
                    onChange={e => setFormData({ ...formData, launchDate: e.target.value })}
                    placeholder="e.g. 24 Feb 2019"
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
                  placeholder="Describe the scheme objective..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key Benefits (one per line)</label>
                <textarea
                  value={formData.benefits}
                  onChange={e => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="e.g. Direct cash transfer of ₹6,000 annually"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Required Documents (comma separated)</label>
                <input
                  type="text"
                  value={formData.documentsRequired}
                  onChange={e => setFormData({ ...formData, documentsRequired: e.target.value })}
                  placeholder="e.g. Aadhaar Card, Income Certificate, Bank Passbook"
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
                  {submitting ? 'Saving...' : 'Save Scheme'}
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
