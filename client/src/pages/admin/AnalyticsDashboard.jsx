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
  RefreshCw
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar
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

  return (
    <div className="h-screen flex overflow-hidden bg-cream font-body">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8 flex flex-col gap-6">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[13px] text-gray-500 font-medium">Dashboard / Analytics</p>
              <h1 className="font-heading text-[28px] font-bold text-gray-900 leading-tight flex items-center gap-2">
                Analytics Overview
              </h1>
            </div>
            
            {/* Filter and Export Action Row */}
            <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
              {/* Data Mode Switch */}
              <div className="inline-flex rounded-full border border-gray-200 bg-white p-0.5 shadow-sm shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDemo(false)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
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
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    isDemo 
                      ? "bg-[#FFF7ED] text-[#EA580C]" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Demo / Seeded
                </button>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                >
                  {TIME_RANGES[timeRange]} <ChevronDown size={16} className="text-gray-400" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                    {Object.entries(TIME_RANGES).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => {
                          setTimeRange(value);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                          timeRange === value
                            ? "bg-orange-50 text-[#F2762E]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleExportCSV}
                disabled={loading || error || !data}
                className="flex items-center gap-2 rounded-full bg-[#F2762E] hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer"
              >
                <Download size={15} />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {/* Total Users */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Total Users</span>
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-[#F2762E] flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.kpis.totalUsers.toLocaleString()}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      <span className="text-emerald-500 font-bold">+{data.kpis.usersInPeriod}</span> signups in period
                    </p>
                  </div>
                </div>

                {/* Total Policy Queries */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">
                      {isDemo ? "Total AI Queries" : "Total Search Queries"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <MessageSquare size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.kpis.totalQueries.toLocaleString()}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {isDemo ? "AI search operations" : "Logged search queries"}
                    </p>
                  </div>
                </div>

                {/* AI Responses Generated */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">
                      {isDemo ? "AI Responses" : "Successful Searches"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.kpis.aiResponses.toLocaleString()}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {isDemo ? "Generated replies" : "Completed database searches"}
                    </p>
                  </div>
                </div>

                {/* Total Policies/Schemes */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">Policies/Schemes</span>
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.kpis.totalInventory}</h3>
                    <p className="text-xs text-gray-400 mt-1">Items in catalog</p>
                  </div>
                </div>

                {/* Successful Response Rate */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">
                      {isDemo ? "RAG Success Rate" : "Search Match Rate"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                      <Zap size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.kpis.successfulResponseRate}%</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {isDemo ? "RAG response success" : "Queries matching schemes/policies"}
                    </p>
                  </div>
                </div>

                {/* Average Response Time */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">
                      {isDemo ? "AI Response Time" : "DB Search Latency"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.kpis.avgResponseTime} ms</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {isDemo ? "Average AI latency" : "Measured database search time"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Query Analytics Chart (Line/Area) */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-8 transition-all duration-200 hover:shadow-md">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Query Volume Analytics</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Tracking success and failure queries over time</p>
                    </div>
                  </div>

                  {data.overTimeData.length === 0 ? (
                    <div className="h-[280px] flex items-center justify-center border border-dashed border-gray-200 rounded-xl">
                      <span className="text-sm font-semibold text-gray-400">No query data available for this range</span>
                    </div>
                  ) : (
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.overTimeData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F2762E" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#F2762E" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                          />
                          <Area type="monotone" dataKey="total" stroke="#F2762E" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" dot={{r: 3}} activeDot={{r: 5}} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Categories Distribution Donut Chart */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-4 transition-all duration-200 hover:shadow-md">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Query Categories</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Distribution of user search interests</p>
                  </div>

                  {data.queryCategories.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-400">No category statistics available</span>
                    </div>
                  ) : (
                    <>
                      <div className="relative flex h-[200px] flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={data.queryCategories}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="count"
                              stroke="none"
                            >
                              {data.queryCategories.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute text-center">
                          <div className="text-3xl font-bold text-gray-900">{data.kpis.totalQueries}</div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Queries</div>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-col gap-2 max-h-[140px] overflow-y-auto scrollbar-hide">
                        {data.queryCategories.map((entry, idx) => (
                          <div className="flex items-center justify-between text-xs" key={idx}>
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{backgroundColor: entry.color}}></div>
                              <span className="text-gray-600 font-semibold">{entry.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-gray-900">{entry.value}%</span>
                              <span className="text-gray-400 font-medium">({entry.count})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Secondary Metrics Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Most Asked Policies Horizontal Bar Chart */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6 transition-all duration-200 hover:shadow-md">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Most Asked Policies</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Top targeted policies matching natural language queries</p>
                  </div>

                  {data.mostAskedPolicies.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center min-h-[220px]">
                      <span className="text-sm font-semibold text-gray-400">No popular policies recorded</span>
                    </div>
                  ) : (
                    <div className="flex-1 mt-6 h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data.mostAskedPolicies}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                          <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fill: '#4b5563', fontWeight: 600}} 
                            width={110}
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9" }}
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {data.mostAskedPolicies.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Recent AI Activity Panel */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6 transition-all duration-200 hover:shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Recent AI Activity</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Latest events in searches, queries and registrations</p>
                    </div>
                  </div>

                  {data.recentActivities.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center min-h-[220px]">
                      <span className="text-sm font-semibold text-gray-400">No recent activity detected</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-[280px] overflow-y-auto pr-1">
                      {data.recentActivities.map((act, idx) => {
                        let iconBg = "bg-orange-50 text-[#F2762E]";
                        let icon = <Search size={14} />;
                        
                        if (act.type === "application") {
                          iconBg = "bg-green-50 text-green-600";
                          icon = <CheckCircle2 size={14} />;
                        } else if (act.type === "user") {
                          iconBg = "bg-blue-50 text-blue-600";
                          icon = <UserCheck size={14} />;
                        }

                        return (
                          <div key={idx} className="flex items-start justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                            <div className="flex items-start gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                                {icon}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate leading-snug">
                                  {act.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5 truncate font-medium">
                                  {act.detail} · By {act.user}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-gray-400 shrink-0 ml-4 pt-0.5">
                              {getFormatTimeAgo(act.time)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Table & RAG Performance Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Policy/Scheme Performance Table */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-8 transition-all duration-200 hover:shadow-md">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Policy & Scheme Analytics</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Metrics sorting catalog elements by user query engagement</p>
                  </div>

                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Scheme/Policy Name</th>
                          <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Type</th>
                          <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Department</th>
                          <th className="pb-3 text-xs font-bold text-gray-400 uppercase text-right">Views</th>
                          <th className="pb-3 text-xs font-bold text-gray-400 uppercase text-right">Apps</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.performanceTable.map((row, idx) => (
                          <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                            <td className="py-3 text-sm font-bold text-gray-900 max-w-[200px] truncate">
                              {row.name}
                            </td>
                            <td className="py-3 text-xs font-medium text-gray-500">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                row.type === "Scheme" ? "bg-amber-50 text-amber-600" : "bg-purple-50 text-purple-600"
                              }`}>
                                {row.type}
                              </span>
                            </td>
                            <td className="py-3 text-xs font-semibold text-gray-400 max-w-[150px] truncate">
                              {row.department}
                            </td>
                            <td className="py-3 text-sm font-bold text-gray-700 text-right">
                              {row.views.toLocaleString()}
                            </td>
                            <td className="py-3 text-sm font-bold text-gray-700 text-right">
                              {row.type === "Scheme" ? row.applications.toLocaleString() : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* AI / RAG Performance Section */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-4 transition-all duration-200 hover:shadow-md">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {isDemo ? "AI / RAG Diagnostics" : "Search Diagnostics"}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isDemo 
                        ? "Platform latency, accuracy, and user satisfaction ratings" 
                        : "Measured search match rates, database latency, and query statistics"
                      }
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-5 flex-1">
                    {/* Metrics values */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {isDemo ? "Search Accuracy" : "Search Match Rate"}
                        </span>
                        <div className="text-lg font-bold text-gray-900 mt-1">{data.ragPerformance.retrievalSuccessRate}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {isDemo ? "Response Time" : "DB Search Latency"}
                        </span>
                        <div className="text-lg font-bold text-gray-900 mt-1">{data.ragPerformance.avgResponseTime}ms</div>
                      </div>
                    </div>

                    {/* Ratings section */}
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase">Feedback Distribution</span>
                      {isDemo ? (
                        <div className="mt-3 flex flex-col gap-2">
                          {/* Positive */}
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <ThumbsUp size={13} />
                              <span>Helpful</span>
                            </div>
                            <span className="text-gray-900">
                              {data.ragPerformance.feedback.positive} ({data.ragPerformance.feedback.total > 0 
                                ? Math.round((data.ragPerformance.feedback.positive / data.ragPerformance.feedback.total) * 100)
                                : 0}%)
                            </span>
                          </div>
                          {/* Negative */}
                          <div className="flex items-center justify-between text-xs font-semibold mt-1">
                            <div className="flex items-center gap-1.5 text-red-500">
                              <ThumbsDown size={13} />
                              <span>Not Helpful</span>
                            </div>
                            <span className="text-gray-900">
                              {data.ragPerformance.feedback.negative} ({data.ragPerformance.feedback.total > 0
                                ? Math.round((data.ragPerformance.feedback.negative / data.ragPerformance.feedback.total) * 100)
                                : 0}%)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 text-xs font-medium text-gray-400 py-3 bg-gray-50 border border-gray-100 rounded-xl text-center">
                          Feedback ratings are only collected for AI responses.
                        </div>
                      )}
                    </div>

                    {/* Failed Queries list */}
                    <div className="flex-1 flex flex-col min-h-0 border-t border-gray-100 pt-4 mt-1">
                      <span className="text-xs font-bold text-gray-400 uppercase mb-3">
                        {isDemo ? "Recent Query Failures" : "Recent Failed Searches"}
                      </span>
                      
                      {data.ragPerformance.failedQueries.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-xs text-gray-400 font-semibold">
                            {isDemo ? "No query failures recorded" : "No failed searches recorded"}
                          </span>
                        </div>
                      ) : (
                        <div className="flex-1 overflow-y-auto max-h-[120px] flex flex-col gap-2.5">
                          {data.ragPerformance.failedQueries.map((f, i) => (
                            <div key={i} className="text-xs border-l-2 border-red-400 pl-2">
                              <p className="font-semibold text-gray-800 truncate">
                                "{f.query}"
                              </p>
                              <span className="text-[10px] text-gray-400 font-medium">
                                Category: {f.category} · {getFormatTimeAgo(f.time)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
