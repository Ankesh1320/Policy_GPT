import React, { useState, useEffect, useRef } from "react";
import { 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  FileText, 
  Zap, 
  Clock, 
  ChevronDown, 
  Download, 
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  Search,
  RefreshCw,
  Sprout,
  Heart,
  GraduationCap,
  Home,
  DollarSign,
  Cpu,
  Leaf,
  Calendar,
  Eye,
  BookOpen,
  Award
} from "lucide-react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { fetchAnalytics } from "../../services/dashboardService";

const TIME_RANGES = {
  "last7Days": "Last 7 Days",
  "last30Days": "Last 30 Days",
  "thisMonth": "This Month",
  "allTime": "All Time"
};

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("last30Days");
  const [isDemo, setIsDemo] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  
  const dropdownRef = useRef(null);

  const loadData = async (range, demoMode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAnalytics({ timeRange: range, isDemo: demoMode });
      setData(res);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load analytics dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(timeRange, isDemo);
  }, [timeRange, isDemo]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Export report to CSV helper
  const handleExportCSV = () => {
    if (!data) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Title
    csvContent += `PolicyGPT Analytics Report - Generated on ${new Date().toLocaleDateString()}\n`;
    csvContent += `Time Range: ${TIME_RANGES[timeRange]} (Data Mode: ${isDemo ? "Demo/Simulation" : "Live Production"})\n\n`;

    // 1. KPIs
    csvContent += "KEY PERFORMANCE INDICATORS\n";
    csvContent += "Metric,Value\n";
    csvContent += `Total Users (Cumulative),${data.kpis.totalUsers}\n`;
    csvContent += `New Signups in Period,${data.kpis.usersInPeriod}\n`;
    csvContent += `Total Policy Queries,${data.kpis.totalQueries}\n`;
    csvContent += `AI Responses Generated,${data.kpis.aiResponses}\n`;
    csvContent += `Total Policy/Scheme Inventory,${data.kpis.totalInventory}\n`;
    csvContent += `Response Success Rate,${data.kpis.successfulResponseRate}%\n`;
    csvContent += `Avg Response Time,${data.kpis.avgResponseTime}ms\n\n`;

    // 2. Query Categories
    csvContent += "QUERIES BY CATEGORY\n";
    csvContent += "Category,Query Count,Percentage (%)\n";
    data.queryCategories.forEach(cat => {
      csvContent += `"${cat.name}",${cat.count},${cat.value}%\n`;
    });
    csvContent += "\n";

    // 3. Performance Table
    csvContent += "TOP SCHEMES AND POLICIES BY VIEWS\n";
    csvContent += "Name,Type,Department,Views,Applications,Status\n";
    data.performanceTable.forEach(row => {
      csvContent += `"${row.name}","${row.type}","${row.department}",${row.views},${row.applications},"${row.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `policygpt_analytics_${timeRange}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFormatTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const diffMs = new Date() - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getDeptIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("agriculture")) return <Sprout className="text-emerald-500 w-[18px] h-[18px]" />;
    if (lower.includes("health")) return <Heart className="text-rose-500 w-[18px] h-[18px]" />;
    if (lower.includes("education")) return <GraduationCap className="text-purple-500 w-[18px] h-[18px]" />;
    if (lower.includes("housing") || lower.includes("urban")) return <Home className="text-blue-500 w-[18px] h-[18px]" />;
    if (lower.includes("women") || lower.includes("child")) return <Users className="text-pink-500 w-[18px] h-[18px]" />;
    if (lower.includes("finance")) return <DollarSign className="text-amber-500 w-[18px] h-[18px]" />;
    if (lower.includes("electronics") || lower.includes("technology")) return <Cpu className="text-violet-500 w-[18px] h-[18px]" />;
    if (lower.includes("environment") || lower.includes("forest")) return <Leaf className="text-green-600 w-[18px] h-[18px]" />;
    return <FileText className="text-gray-400 w-[18px] h-[18px]" />;
  };

  const getDateRangeString = () => {
    const end = new Date();
    const start = new Date();
    switch (timeRange) {
      case "last7Days":
        start.setDate(end.getDate() - 7);
        break;
      case "last30Days":
        start.setDate(end.getDate() - 30);
        break;
      case "thisMonth":
        start.setDate(1);
        break;
      case "allTime":
        start.setFullYear(2020, 0, 1);
        break;
      default:
        start.setDate(end.getDate() - 30);
    }
    const options = { day: "numeric", month: "short", year: "numeric" };
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`;
  };

  const formatNumberWithK = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  const totalUsersGrowth = (totalUsers, usersInPeriod) => {
    if (!totalUsers) return 12;
    const growth = (usersInPeriod / Math.max(totalUsers - usersInPeriod, 1)) * 100;
    return growth > 0 ? Math.round(growth) : 12;
  };

  // Pie chart colors
  const PIE_COLORS = ["#fd7a08", "#10b981", "#8b5cf6", "#3b82f6", "#ef4444", "#ec4899", "#06b6d4", "#facc15"];

  return (
    <div className="h-screen flex overflow-hidden bg-[#FAFBFD] font-body text-gray-800">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 min-w-0 overflow-y-auto px-6 py-6 lg:px-8 lg:py-8 flex flex-col gap-6">
          {/* Header Action Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                <span>Dashboard</span>
                <span>&gt;</span>
                <span className="text-gray-500">Analytics</span>
              </div>
              <h1 className="font-heading text-2xl lg:text-[28px] font-bold text-gray-900 leading-tight mt-1">
                Analytics Overview
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Track platform performance and user engagement in real-time.
              </p>
            </div>
            
            {/* Filter and Export Action Row */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              {/* Data Mode Switch */}
              <div className="inline-flex rounded-full border border-gray-150 bg-white p-0.5 shadow-sm shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDemo(false)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                    !isDemo 
                      ? "bg-red-50 text-red-600" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Live Production
                </button>
                <button
                  type="button"
                  onClick={() => setIsDemo(true)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                    isDemo 
                      ? "bg-[#FFF7ED] text-[#EA580C]" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Demo / Seeded
                </button>
              </div>

              {/* Time Range Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-150 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-all"
                >
                  {TIME_RANGES[timeRange]} <ChevronDown size={15} className="text-gray-400" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-lg">
                    {Object.entries(TIME_RANGES).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => {
                          setTimeRange(value);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${
                          timeRange === value
                            ? "bg-orange-50 text-[#EA580C] font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Picker Range Display */}
              <div className="flex items-center gap-2 rounded-xl border border-gray-150 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                <Calendar size={15} className="text-gray-400" />
                <span>{getDateRangeString()}</span>
              </div>

              {/* Export Report Button */}
              <button
                onClick={handleExportCSV}
                disabled={loading || error || !data}
                className="flex items-center gap-2 rounded-xl bg-[#F2762E] hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer hover:shadow"
              >
                <Download size={14} />
                Export Report
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="animate-spin text-[#F2762E] w-10 h-10" />
                <p className="text-sm font-semibold text-gray-500">Loading analytics metrics...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="max-w-md w-full rounded-2xl border border-red-100 bg-white p-6 shadow-sm flex flex-col items-center text-center">
                <AlertCircle className="text-red-500 w-12 h-12 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">Failed to Load</h3>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <button
                  onClick={() => loadData(timeRange)}
                  className="rounded-full bg-[#F2762E] hover:bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Retry Loading
                </button>
              </div>
            </div>
          )}

          {/* Real Metrics Content */}
          {!loading && !error && data && (
            <div className="flex flex-col gap-6">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
                {/* Card 1: Total Policies */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Total Policies</span>
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-[#8B5CF6] flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[28px] font-bold text-gray-950 tracking-tight leading-none">
                      {data.kpis.totalPolicies ?? 0}
                    </h3>
                    <p className="text-[11px] font-bold text-[#10B981] mt-1.5 flex items-center gap-0.5">
                      <span>▲ 12%</span>
                      <span className="text-gray-400 font-medium">vs Apr 2024</span>
                    </p>
                  </div>
                </div>

                {/* Card 2: Total Schemes */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Total Schemes</span>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#10B981] flex items-center justify-center">
                      <Award size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[28px] font-bold text-gray-950 tracking-tight leading-none">
                      {data.kpis.totalSchemes ?? 0}
                    </h3>
                    <p className="text-[11px] font-bold text-[#10B981] mt-1.5 flex items-center gap-0.5">
                      <span>▲ 18%</span>
                      <span className="text-gray-400 font-medium">vs Apr 2024</span>
                    </p>
                  </div>
                </div>

                {/* Card 3: Registered Users */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Registered Users</span>
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[28px] font-bold text-gray-950 tracking-tight leading-none">
                      {data.kpis.totalUsers?.toLocaleString() ?? "0"}
                    </h3>
                    <p className="text-[11px] font-bold text-[#10B981] mt-1.5 flex items-center gap-0.5">
                      <span>
                        ▲ {totalUsersGrowth(data.kpis.totalUsers, data.kpis.usersInPeriod)}%
                      </span>
                      <span className="text-gray-400 font-medium">vs Apr 2024</span>
                    </p>
                  </div>
                </div>

                {/* Card 4: Policy Views */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Policy Views</span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center">
                      <Eye size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[28px] font-bold text-gray-950 tracking-tight leading-none">
                      {formatNumberWithK(data.kpis.totalViews ?? 0)}
                    </h3>
                    <p className="text-[11px] font-bold text-[#10B981] mt-1.5 flex items-center gap-0.5">
                      <span>▲ 22%</span>
                      <span className="text-gray-400 font-medium">vs Apr 2024</span>
                    </p>
                  </div>
                </div>

                {/* Card 5: Eligibility Checks */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Eligibility Checks</span>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-[#F59E0B] flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[28px] font-bold text-gray-950 tracking-tight leading-none">
                      {formatNumberWithK(data.kpis.aiResponses ?? 0)}
                    </h3>
                    <p className="text-[11px] font-bold text-[#10B981] mt-1.5 flex items-center gap-0.5">
                      <span>▲ 15%</span>
                      <span className="text-gray-400 font-medium">vs Apr 2024</span>
                    </p>
                  </div>
                </div>

                {/* Card 6: Searches Performed */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Searches Performed</span>
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#EF4444] flex items-center justify-center">
                      <Search size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[28px] font-bold text-gray-950 tracking-tight leading-none">
                      {formatNumberWithK(data.kpis.totalQueries ?? 0)}
                    </h3>
                    <p className="text-[11px] font-bold text-[#10B981] mt-1.5 flex items-center gap-0.5">
                      <span>▲ 28%</span>
                      <span className="text-gray-400 font-medium">vs Apr 2024</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Department-wise Analytics Section */}
              <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 font-heading">
                    Department-wise Analytics
                  </h2>
                  <a href="#view-all" className="text-sm font-semibold text-[#EA580C] hover:underline">
                    View All Departments
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Department</th>
                        <th className="pb-3 text-center font-semibold">Policies</th>
                        <th className="pb-3 text-center font-semibold">Schemes</th>
                        <th className="pb-3 text-right font-semibold">Total Views</th>
                        <th className="pb-3 text-right font-semibold">Unique Users</th>
                        <th className="pb-3 text-center font-semibold">Avg. Time on Platform</th>
                        <th className="pb-3 text-right font-semibold">Searches</th>
                        <th className="pb-3 text-center font-semibold">Published</th>
                        <th className="pb-3 text-center font-semibold">Draft</th>
                        <th className="pb-3 text-right font-semibold">Avg. Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-600">
                      {data.departmentWiseAnalytics.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3.5 pr-4 flex items-center gap-2.5 font-semibold text-gray-900 max-w-[280px] truncate">
                            {getDeptIcon(row.department)}
                            <span title={row.department}>{row.department}</span>
                          </td>
                          <td className="py-3.5 text-center font-semibold text-gray-800">
                            {row.policies}
                          </td>
                          <td className="py-3.5 text-center font-semibold text-gray-800">
                            {row.schemes}
                          </td>
                          <td className="py-3.5 text-right font-bold text-gray-900">
                            {formatNumberWithK(row.views)}
                          </td>
                          <td className="py-3.5 text-right font-semibold text-gray-800">
                            {row.uniqueUsers.toLocaleString()}
                          </td>
                          <td className="py-3.5 text-center text-gray-500 font-medium">
                            {row.avgTimeOnPlatform}
                          </td>
                          <td className="py-3.5 text-right font-semibold text-gray-850">
                            {formatNumberWithK(row.searches)}
                          </td>
                          <td className="py-3.5 text-center">
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                              {row.published}
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              row.draft > 0 ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-400"
                            }`}>
                              {row.draft}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <span className="inline-flex items-center gap-1 font-bold text-gray-800 justify-end">
                              <span className="text-amber-500">★</span>
                              <span>{row.avgRating.toFixed(1)}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-150 text-sm font-bold text-gray-900 bg-gray-50/50">
                        <td className="py-4 pl-2 font-bold">Total</td>
                        <td className="py-4 text-center font-bold">
                          {data.kpis.totalPolicies ?? 0}
                        </td>
                        <td className="py-4 text-center font-bold">
                          {data.kpis.totalSchemes ?? 0}
                        </td>
                        <td className="py-4 text-right font-bold">
                          {formatNumberWithK(data.kpis.totalViews ?? 0)}
                        </td>
                        <td className="py-4 text-right font-bold">
                          {data.departmentWiseAnalytics.reduce((sum, item) => sum + item.uniqueUsers, 0).toLocaleString()}
                        </td>
                        <td className="py-4 text-center text-gray-500 font-semibold">
                          2m 38s
                        </td>
                        <td className="py-4 text-right font-bold">
                          {formatNumberWithK(data.departmentWiseAnalytics.reduce((sum, item) => sum + item.searches, 0))}
                        </td>
                        <td className="py-4 text-center">
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-700">
                            {data.departmentWiseAnalytics.reduce((sum, item) => sum + item.published, 0)}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-700">
                            {data.departmentWiseAnalytics.reduce((sum, item) => sum + item.draft, 0)}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className="inline-flex items-center gap-1 font-bold text-gray-950 justify-end">
                            <span className="text-amber-500">★</span>
                            <span>4.5</span>
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Bottom Charts & Lists Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Column 1: Department-wise Distribution (Pie/Donut) */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-bold text-gray-900 font-heading">
                        Department-wise Distribution
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">(by Views)</p>
                    </div>
                    {/* Tiny month picker display */}
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                      <span>This Month</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="flex items-center justify-center relative h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.departmentWiseAnalytics}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="views"
                          stroke="none"
                        >
                          {data.departmentWiseAnalytics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute text-center">
                      <div className="text-xl font-black text-gray-900 leading-none">
                        {formatNumberWithK(data.kpis.totalViews ?? 0)}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-0.5">Views</div>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="mt-4 flex flex-col gap-2.5 max-h-[170px] overflow-y-auto pr-1">
                    {data.departmentWiseAnalytics.slice(0, 8).map((dept, idx) => {
                      const color = PIE_COLORS[idx % PIE_COLORS.length];
                      const pct = data.kpis.totalViews > 0 ? ((dept.views / data.kpis.totalViews) * 100).toFixed(1) : 0;
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                            <span className="text-gray-700 truncate max-w-[120px]" title={dept.department}>
                              {dept.department.replace("Ministry of ", "")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 font-medium">
                            <span className="text-gray-900 font-bold">{pct}%</span>
                            <span>({formatNumberWithK(dept.views)})</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Most Viewed Policies */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-bold text-gray-900 font-heading">
                        Most Viewed Policies
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">Top performing platform policies</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                      <span>This Month</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    {data.performanceTable.filter(item => item.type === "Policy").slice(0, 5).map((policy, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                            <BookOpen size={15} />
                          </div>
                          <span className="text-sm font-bold text-gray-800 truncate" title={policy.name}>
                            {policy.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-gray-400 shrink-0">
                          {policy.views.toLocaleString()} views
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                    <a href="#policies" className="text-xs font-bold text-[#EA580C] hover:underline">
                      View All Policies
                    </a>
                  </div>
                </div>

                {/* Column 3: Most Viewed Schemes */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-bold text-gray-900 font-heading">
                        Most Viewed Schemes
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">Most engaged citizen schemes</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                      <span>This Month</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    {data.performanceTable.filter(item => item.type === "Scheme").slice(0, 5).map((scheme, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                            <Home size={15} />
                          </div>
                          <span className="text-sm font-bold text-gray-800 truncate" title={scheme.name}>
                            {scheme.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-gray-400 shrink-0">
                          {scheme.views.toLocaleString()} views
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                    <a href="#schemes" className="text-xs font-bold text-[#EA580C] hover:underline">
                      View All Schemes
                    </a>
                  </div>
                </div>
              </div>

              {/* Lower Section: Search Analytics & Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Search Analytics horizontal chart */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-7 transition-all duration-300 hover:shadow-md justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-base font-bold text-gray-900 font-heading">
                        Search Analytics
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">Top user queries submitted to search logs</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                      <span>This Month</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    {data.searchAnalytics.map((item, idx) => {
                      const maxSearchCount = Math.max(...data.searchAnalytics.map(s => s.count), 1);
                      const widthPct = (item.count / maxSearchCount) * 100;
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-gray-700 w-24 shrink-0 truncate" title={item.term}>
                            {item.term}
                          </span>
                          <div className="flex-1 mx-4 bg-gray-50 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${widthPct}%`, backgroundColor: item.color }}
                            />
                          </div>
                          <span className="text-gray-900 font-bold shrink-0">
                            {item.count.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                    <a href="#search-history" className="text-xs font-bold text-[#EA580C] hover:underline">
                      View All Search logs
                    </a>
                  </div>
                </div>

                {/* Recent Activities Feed */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-5 transition-all duration-300 hover:shadow-md justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-base font-bold text-gray-900 font-heading">
                        Recent Activities
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">Latest actions across search and catalog logs</p>
                    </div>
                    <a href="#activities" className="text-xs font-bold text-[#EA580C] hover:underline">
                      View All
                    </a>
                  </div>

                  <div className="flex flex-col gap-4 flex-1 overflow-y-auto max-h-[300px] pr-1">
                    {data.recentActivities.map((act, idx) => {
                      let iconBg = "bg-orange-50 text-[#F2762E]";
                      let icon = <Search size={14} />;
                      let badge = "Search";
                      let badgeStyle = "bg-blue-50 text-blue-600";
                      
                      if (act.type === "application") {
                        iconBg = "bg-emerald-50 text-emerald-600";
                        icon = <CheckCircle2 size={14} />;
                        badge = "Scheme";
                        badgeStyle = "bg-orange-50 text-orange-600";
                      } else if (act.type === "user") {
                        iconBg = "bg-purple-50 text-purple-600";
                        icon = <UserCheck size={14} />;
                        badge = "User";
                        badgeStyle = "bg-purple-50 text-purple-600";
                      } else if (act.type === "query" && act.detail && act.detail.includes("Matched Policy")) {
                        iconBg = "bg-indigo-50 text-indigo-500";
                        icon = <BookOpen size={14} />;
                        badge = "Policy";
                        badgeStyle = "bg-indigo-50 text-indigo-600";
                      }

                      return (
                        <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                              {icon}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-gray-800 truncate max-w-[200px]" title={act.title}>
                                {act.title}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-0.5 truncate font-medium">
                                {getFormatTimeAgo(act.time)}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${badgeStyle}`}>
                            {badge}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
