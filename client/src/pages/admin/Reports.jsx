import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Layers,
  Building2,
  Users,
  BarChart2,
  Calendar,
  Info,
  Download,
  X,
  FileSpreadsheet,
  Files
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { reportService } from '../../services/reportService';

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
const STATE_OPTIONS = ['All States', 'Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'Delhi', 'Gujarat'];
const MINISTRY_OPTIONS = [
  'All Ministries',
  'Ministry of Agriculture & Farmers Welfare',
  'Ministry of Housing & Urban Affairs',
  'Ministry of Women & Child Development',
  'Ministry of Health & Family Welfare',
  'Ministry of Finance',
  'Ministry of Education'
];
const CATEGORY_OPTIONS = [
  'All Categories',
  'Agriculture',
  'Housing',
  'Healthcare',
  'Education',
  'Women Welfare',
  'Financial Aid',
  'Employment'
];

const REPORT_TYPES = [
  {
    id: 'policy',
    title: 'Policy Report',
    description: 'Comprehensive policy insights and statistics',
    icon: FileText,
    iconBg: 'bg-purple-50 text-purple-600',
  },
  {
    id: 'scheme',
    title: 'Scheme Report',
    description: 'Detailed scheme performance and beneficiary data',
    icon: Layers,
    iconBg: 'bg-green-50 text-green-600',
  },
  {
    id: 'department',
    title: 'Department Report',
    description: 'Department-wise coverage and performance',
    icon: Building2,
    iconBg: 'bg-orange-50 text-orange-600',
  },
  {
    id: 'user_activity',
    title: 'User Activity Report',
    description: 'User engagement and platform activity insights',
    icon: Users,
    iconBg: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'analytics',
    title: 'Analytics Report',
    description: 'Platform analytics and usage statistics',
    icon: BarChart2,
    iconBg: 'bg-pink-50 text-pink-600',
  }
];

export default function Reports() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  // View Toggle State
  const [view, setView] = useState('dashboard');
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const loadHistory = async () => {
    try {
      setHistoryLoading(true);
      const data = await reportService.getHistory();
      setHistory(data);
    } catch (err) {
      console.error("Error loading report history:", err);
      showToast("Failed to load report history.", "error");
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'dashboard') {
      loadHistory();
    }
  }, [view]);

  const handleDownloadHistory = async (reportId, format) => {
    try {
      showToast("Re-generating and exporting historical report...", "success");
      const blob = await reportService.download(reportId, format);
      const url = window.URL.createObjectURL(new Blob([blob], { type: blob.type }));
      const link = document.createElement("a");
      link.href = url;
      
      const fileType = format === "excel" ? "xlsx" : format === "both" ? "zip" : "pdf";
      link.setAttribute("download", `report_${reportId}_export.${fileType}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      showToast("Download started successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to download historical report.", "error");
    }
  };

  // Form State
  const [selectedReportType, setSelectedReportType] = useState('policy');
  const [department, setDepartment] = useState('All Departments');
  
  const getTodayDateString = () => new Date().toISOString().slice(0, 10);
  const getYearStartDateString = () => `${new Date().getFullYear()}-01-01`;

  const [startDate, setStartDate] = useState(getYearStartDateString());
  const [endDate, setEndDate] = useState(getTodayDateString());
  const [status, setStatus] = useState('All Status');
  const [state, setState] = useState('All States');
  const [ministry, setMinistry] = useState('All Ministries');
  const [category, setCategory] = useState('All Categories');
  const [exportFormat, setExportFormat] = useState('pdf');

  // UI State
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleCancel = () => {
    setView('dashboard');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReportType) {
      showToast('Please select a report type.', 'error');
      return;
    }
    if (!exportFormat) {
      showToast('Please select an export format.', 'error');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      showToast('Start Date cannot be after End Date.', 'error');
      return;
    }

    try {
      setLoading(true);
      const activeReport = REPORT_TYPES.find(r => r.id === selectedReportType);
      const blob = await reportService.generate({
        reportType: activeReport ? activeReport.title : selectedReportType,
        department,
        startDate,
        endDate,
        status,
        state,
        ministry,
        category,
        exportFormat
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([blob], { type: blob.type }));
      const link = document.createElement("a");
      link.href = url;

      const fileType = exportFormat === "excel" ? "xlsx" : exportFormat === "both" ? "zip" : "pdf";
      const baseName = (activeReport ? activeReport.title : selectedReportType).toLowerCase().replace(/[^a-z0-9]+/g, "_");
      const today = new Date().toISOString().slice(0, 10);
      const fileName = `${baseName}_report_${today}.${fileType}`;

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showToast('Report generated and downloaded successfully!', 'success');
      setView('dashboard');
    } catch (err) {
      console.error(err);
      
      if (err.response && err.response.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const parsed = JSON.parse(text);
          showToast(parsed.message || 'Failed to generate report.', 'error');
        } catch (_) {
          showToast('Failed to generate report.', 'error');
        }
      } else {
        showToast(err.message || 'Failed to generate report.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-cream font-body">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <AdminHeader onMenuClick={() => setIsSidebarOpen(p => !p)} />

        <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8">
          {view === 'dashboard' ? (
            <div className="max-w-8xl mx-auto space-y-6">
              {/* Header card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-gradient-to-r from-[#F7D2A8] via-white to-[#D8F3E3] border border-[#E2E8F0] p-6 shadow-sm gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    Generate Government Intelligence Reports
                  </h1>
                  <p className="text-sm text-gray-500 mt-2">
                    Create and export insightful reports on policies, schemes, departments, user activity and citizen engagement.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setView('generate')}
                  className="flex items-center gap-2 rounded-full bg-[#F2762E] hover:bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  <Download className="w-4.5 h-4.5" />
                  Generate New Report
                </button>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Policy Reports Card */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Policy Reports</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                      {history.filter(r => r.reportType === "Policy").length}
                    </h2>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">PDF exports ready</p>
                  </div>
                </div>

                {/* Scheme Reports Card */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Scheme Reports</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                      {history.filter(r => r.reportType === "Scheme").length}
                    </h2>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Excel exports ready</p>
                  </div>
                </div>

                {/* User Activity Reports Card */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#F2762E] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">User Activity Reports</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                      {history.filter(r => r.reportType === "User Activity" || r.reportType === "Analytics").length}
                    </h2>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Monthly engagement</p>
                  </div>
                </div>
              </div>

              {/* Recent Reports Section */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Recent Reports</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-medium">All Types</span>
                  </div>
                </div>

                {historyLoading ? (
                  <div className="p-8 text-center text-sm text-gray-500">Loading reports history...</div>
                ) : history.length === 0 ? (
                  <div className="p-10 text-center text-sm text-gray-500">No reports generated yet. Click "Generate New Report" to start.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-[#FAFAFA]">
                        <tr>
                          <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Report Name</th>
                          <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Type</th>
                          <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Generated On</th>
                          <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Status</th>
                          <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Generated By</th>
                          <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-500">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {history.map((row) => (
                          <tr key={row._id} className="hover:bg-orange-50/10 transition-colors">
                            <td className="px-6 py-4.5 text-sm font-bold text-gray-800 leading-normal">{row.reportName}</td>
                            <td className="px-6 py-4.5 whitespace-nowrap">
                              <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                row.reportType === 'Policy' ? 'bg-purple-50 text-purple-600' :
                                row.reportType === 'Scheme' ? 'bg-green-50 text-green-600' :
                                row.reportType === 'Department' ? 'bg-orange-50 text-orange-600' :
                                'bg-blue-50 text-blue-600'
                              }`}>
                                {row.reportType}
                              </span>
                            </td>
                            <td className="px-6 py-4.5 whitespace-nowrap text-sm text-gray-500 font-medium">
                              {new Date(row.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}, {new Date(row.createdAt).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </td>
                            <td className="px-6 py-4.5 whitespace-nowrap">
                              <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                row.status === 'Ready' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-4.5 whitespace-nowrap text-sm text-gray-600 font-medium">{row.generatedByName}</td>
                            <td className="px-6 py-4.5 whitespace-nowrap text-sm flex items-center gap-2.5">
                              {row.exportFormat !== 'excel' && (
                                <button
                                  type="button"
                                  onClick={() => handleDownloadHistory(row._id, 'pdf')}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-xs font-bold text-red-600 hover:text-red-700 transition cursor-pointer"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  PDF
                                </button>
                              )}
                              {row.exportFormat !== 'pdf' && (
                                <button
                                  type="button"
                                  onClick={() => handleDownloadHistory(row._id, 'excel')}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 text-xs font-bold text-green-600 hover:text-green-700 transition cursor-pointer"
                                >
                                  <FileSpreadsheet className="w-3.5 h-3.5" />
                                  Excel
                                </button>
                              )}
                              {row.exportFormat === 'both' && (
                                <button
                                  type="button"
                                  onClick={() => handleDownloadHistory(row._id, 'both')}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-purple-200 hover:bg-purple-50 text-xs font-bold text-purple-600 hover:text-purple-700 transition cursor-pointer"
                                >
                                  <Files className="w-3.5 h-3.5" />
                                  ZIP
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 relative max-w-6xl mx-auto">
              {/* Top Close Button */}
              <button
                type="button"
                onClick={handleCancel}
                className="absolute top-6 right-6 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header section */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <BarChart2 className="w-6 h-6 text-[#F2762E]" strokeWidth={2} />
                </div>
                <div className="pr-8">
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight animate-fade-in">
                    Generate New Report
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose report type, filters and export preferences to generate your custom report.
                  </p>
                </div>
              </div>

              {/* 1. Report Type Section */}
              <div className="mb-8">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  1. Report Type
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {REPORT_TYPES.map((type) => {
                    const isSelected = selectedReportType === type.id;
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedReportType(type.id)}
                        className={`relative flex flex-col items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#F2762E] bg-orange-50/10 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        {/* Selection Radio Dot indicator in top-right */}
                        <div className="absolute top-4 right-4">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'border-[#F2762E] bg-[#F2762E]' : 'border-gray-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>

                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg ${type.iconBg} flex items-center justify-center mb-4 shrink-0`}>
                          <IconComponent className="w-5 h-5" strokeWidth={2} />
                        </div>

                        {/* Info */}
                        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1">
                          {type.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 font-medium leading-normal pr-4">
                          {type.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Filters Section */}
              <div className="mb-8">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  2. Filters
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Department Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">Department (Optional)</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full h-[46px] px-3.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition-colors appearance-none cursor-pointer select-arrow"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5em 1.5em',
                        backgroundRepeat: 'no-repeat',
                        paddingRight: '2.5rem'
                      }}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range Inputs */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">Date Range</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1 text-[9px] font-bold text-gray-400 uppercase select-none pointer-events-none">Start Date</span>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full pl-3 pr-2 pt-5 pb-1 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition-colors"
                        />
                      </div>
                      <span className="text-gray-400 font-medium">-</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1 text-[9px] font-bold text-gray-400 uppercase select-none pointer-events-none">End Date</span>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full pl-3 pr-2 pt-5 pb-1 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">Status (Optional)</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full h-[46px] px-3.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5em 1.5em',
                        backgroundRepeat: 'no-repeat',
                        paddingRight: '2.5rem'
                      }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* State Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">State (Optional)</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full h-[46px] px-3.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5em 1.5em',
                        backgroundRepeat: 'no-repeat',
                        paddingRight: '2.5rem'
                      }}
                    >
                      {STATE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Ministry Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">Ministry (Optional)</label>
                    <select
                      value={ministry}
                      onChange={(e) => setMinistry(e.target.value)}
                      className="w-full h-[46px] px-3.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5em 1.5em',
                        backgroundRepeat: 'no-repeat',
                        paddingRight: '2.5rem'
                      }}
                    >
                      {MINISTRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">Category (Optional)</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-[46px] px-3.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5em 1.5em',
                        backgroundRepeat: 'no-repeat',
                        paddingRight: '2.5rem'
                      }}
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Export Format Section */}
              <div className="mb-8">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  3. Export Format
                </h2>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                  {/* PDF option */}
                  <button
                    type="button"
                    onClick={() => setExportFormat('pdf')}
                    className="flex flex-1 items-center gap-3.5 p-4 rounded-xl border border-gray-100 hover:border-gray-200 bg-white text-left cursor-pointer transition"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      exportFormat === 'pdf' ? 'border-[#F2762E] bg-[#F2762E]' : 'border-gray-300 bg-white'
                    }`}>
                      {exportFormat === 'pdf' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-[#F2762E] shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">PDF</h3>
                      <p className="text-[11px] text-gray-500 font-medium">Export as PDF document</p>
                    </div>
                  </button>

                  {/* Excel option */}
                  <button
                    type="button"
                    onClick={() => setExportFormat('excel')}
                    className="flex flex-1 items-center gap-3.5 p-4 rounded-xl border border-gray-100 hover:border-gray-200 bg-white text-left cursor-pointer transition"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      exportFormat === 'excel' ? 'border-[#F2762E] bg-[#F2762E]' : 'border-gray-300 bg-white'
                    }`}>
                      {exportFormat === 'excel' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">Excel</h3>
                      <p className="text-[11px] text-gray-500 font-medium">Export as Excel spreadsheet</p>
                    </div>
                  </button>

                  {/* Both option */}
                  <button
                    type="button"
                    onClick={() => setExportFormat('both')}
                    className="flex flex-1 items-center gap-3.5 p-4 rounded-xl border border-gray-100 hover:border-gray-200 bg-white text-left cursor-pointer transition"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      exportFormat === 'both' ? 'border-[#F2762E] bg-[#F2762E]' : 'border-gray-300 bg-white'
                    }`}>
                      {exportFormat === 'both' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                      <Files className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">Both PDF & Excel</h3>
                      <p className="text-[11px] text-gray-500 font-medium">Export in both formats</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Note & Bottom Actions Bar */}
              <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 p-5 bg-[#FFF7ED] border border-[#FFEDD5] rounded-2xl">
                <div className="flex items-start gap-3 flex-1">
                  <Info className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-gray-800 block">Note</span>
                    <span className="text-xs text-gray-600 font-medium leading-relaxed">
                      Reports may take a few moments to generate based on the selected filters and data volume. You will be notified once the report is ready.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#F2762E] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4.5 h-4.5" />
                        Generate Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>

      {/* Toast Alert */}
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
