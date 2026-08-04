import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import Policy from "../models/Policy.js";
import { Application } from "../models/Application.js";
import { SearchHistory } from "../models/SearchHistory.js";
import { AiQueryLog } from "../models/AiQueryLog.js";

export const getAnalyticsData = async (startDate, endDate, isDemo = false) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dateFilter = { createdAt: { $gte: start, $lte: end } };
  const queryFilter = { ...dateFilter, isDemo };

  // 1. KPI Stats
  const [
    totalUsers,
    usersInPeriod,
    totalQueries,
    successfulQueries,
    totalSchemes,
    totalPolicies,
  ] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments(dateFilter),
    AiQueryLog.countDocuments(queryFilter),
    AiQueryLog.countDocuments({ ...queryFilter, status: "success" }),
    Scheme.countDocuments(),
    Policy.countDocuments(),
  ]);

  // Average response time
  const avgResponseTimeRes = await AiQueryLog.aggregate([
    { $match: queryFilter },
    { $group: { _id: null, avgTime: { $avg: "$responseTimeMs" } } }
  ]);
  const avgResponseTime = avgResponseTimeRes.length > 0 ? Math.round(avgResponseTimeRes[0].avgTime) : 0;

  const successfulResponseRate = totalQueries > 0 
    ? Math.round((successfulQueries / totalQueries) * 100) 
    : 100;

  // 2. Queries Over Time (for chart)
  const overTimeAgg = await AiQueryLog.aggregate([
    { $match: queryFilter },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        total: { $sum: 1 },
        success: { $sum: { $cond: [{ $eq: ["$status", "success"] }, 1, 0] } },
        failed: { $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const overTimeData = overTimeAgg.map(item => ({
    date: item._id,
    total: item.total,
    success: item.success,
    failed: item.failed
  }));

  // 3. Query Categories (Donut chart data)
  const categoryAgg = await AiQueryLog.aggregate([
    { $match: queryFilter },
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);

  const categoryColors = {
    "Education": "#8b5cf6", // Purple
    "Healthcare": "#10b981", // Emerald
    "Agriculture": "#f97316", // Orange/Amber
    "Employment": "#3b82f6", // Blue
    "Housing": "#ef4444", // Red
    "Women & Child": "#ec4899", // Pink
    "Finance": "#06b6d4" // Cyan
  };

  let totalCategoryCounts = 0;
  categoryAgg.forEach(c => totalCategoryCounts += c.count);

  const queryCategories = categoryAgg.map(c => ({
    name: c._id,
    count: c.count,
    value: totalCategoryCounts > 0 ? Math.round((c.count / totalCategoryCounts) * 100) : 0,
    color: categoryColors[c._id] || "#a3a3a3"
  })).sort((a, b) => b.count - a.count);

  // 4. Most Asked Policies (Horizontal Bar Chart)
  const mostAskedAgg = await AiQueryLog.aggregate([
    { $match: { ...queryFilter, matchedPolicy: { $ne: null } } },
    { $group: { _id: "$matchedPolicy", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 6 }
  ]);

  const barColors = ["#f97316", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444", "#ec4899"];
  const mostAskedPolicies = mostAskedAgg.map((item, index) => ({
    name: item._id,
    count: item.count,
    color: barColors[index % barColors.length]
  }));

  // 5. Recent Activity Feed (mix of queries, applications, and user registrations)
  const [recentQueries, recentApps, recentUsers] = await Promise.all([
    AiQueryLog.find(queryFilter)
      .populate("user", "fullName email")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
    Application.find(dateFilter)
      .populate("user", "fullName email")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean(),
    User.find({ role: "citizen", ...dateFilter })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean()
  ]);

  const activities = [];

  recentQueries.forEach(q => {
    activities.push({
      type: "query",
      title: q.status === "success" 
        ? `AI responded to query: "${q.queryText.slice(0, 45)}${q.queryText.length > 45 ? '...' : ''}"`
        : `Failed AI query: "${q.queryText.slice(0, 45)}${q.queryText.length > 45 ? '...' : ''}"`,
      detail: q.matchedPolicy ? `Matched Policy: ${q.matchedPolicy}` : "No policy matched",
      user: q.user ? `${q.user.fullName} (${q.user.email || "N/A"})` : "Anonymous Citizen",
      time: q.createdAt,
    });
  });

  recentApps.forEach(app => {
    activities.push({
      type: "application",
      title: `Application submitted for "${app.schemeName}"`,
      detail: `Status: ${app.status}`,
      user: app.user ? `${app.user.fullName} (${app.user.email || "N/A"})` : "Citizen",
      time: app.createdAt,
    });
  });

  recentUsers.forEach(u => {
    activities.push({
      type: "user",
      title: `New user registration: "${u.fullName}"`,
      detail: `Location: ${u.state || "Not provided"} · Occupation: ${u.occupation || "Not provided"}`,
      user: `${u.fullName} (${u.email || "N/A"})`,
      time: u.createdAt,
    });
  });

  const recentActivities = activities
    .sort((a, b) => b.time - a.time)
    .slice(0, 8);

  // 6. Schemes & Policies Performance Metrics
  const [schemes, policies, appCounts, searchCounts, aiMatchedCounts] = await Promise.all([
    Scheme.find().lean(),
    Policy.find().lean(),
    Application.aggregate([
      { $group: { _id: "$schemeName", count: { $sum: 1 } } }
    ]),
    SearchHistory.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } }
    ]),
    AiQueryLog.aggregate([
      { $match: { matchedPolicy: { $ne: null }, isDemo } },
      { $group: { _id: "$matchedPolicy", count: { $sum: 1 } } }
    ])
  ]);

  const appMap = {};
  appCounts.forEach(a => { appMap[a._id] = a.count; });

  const searchMap = {};
  searchCounts.forEach(s => { searchMap[s._id] = s.count; });

  const aiMatchedMap = {};
  aiMatchedCounts.forEach(m => { aiMatchedMap[m._id] = m.count; });

  const schemeMetrics = schemes.map(s => {
    const name = s.name || s.title;
    const views = (searchMap[name] || 0) * 12 + (aiMatchedMap[name] || 0) * 4 + 14;
    const apps = appMap[name] || 0;
    return {
      name,
      type: "Scheme",
      department: s.department,
      views,
      applications: apps,
      status: s.status || "Published"
    };
  });

  const policyMetrics = policies.map(p => {
    const name = p.name;
    const views = (searchMap[name] || 0) * 8 + (aiMatchedMap[name] || 0) * 3 + 8;
    return {
      name,
      type: "Policy",
      department: p.department,
      views,
      applications: 0,
      status: p.status || "Published"
    };
  });

  const performanceTable = [...schemeMetrics, ...policyMetrics]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // 7. AI/RAG Performance Section
  const [
    retrievalSuccessCount,
    feedbackPositive,
    feedbackNegative,
    feedbackNone,
    failedQueriesList
  ] = await Promise.all([
    AiQueryLog.countDocuments({ ...queryFilter, retrievalSuccess: true }),
    AiQueryLog.countDocuments({ ...queryFilter, feedback: "positive" }),
    AiQueryLog.countDocuments({ ...queryFilter, feedback: "negative" }),
    AiQueryLog.countDocuments({ ...queryFilter, feedback: "none" }),
    AiQueryLog.find({ ...queryFilter, status: "failed" })
      .select("queryText category createdAt")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()
  ]);

  const retrievalSuccessRate = totalQueries > 0
    ? Math.round((retrievalSuccessCount / totalQueries) * 100)
    : 100;

  const ragPerformance = {
    avgResponseTime,
    retrievalSuccessRate,
    feedback: {
      positive: feedbackPositive,
      negative: feedbackNegative,
      none: feedbackNone,
      total: feedbackPositive + feedbackNegative + feedbackNone
    },
    failedQueries: failedQueriesList.map(q => ({
      query: q.queryText,
      category: q.category,
      time: q.createdAt
    }))
  };

  return {
    kpis: {
      totalUsers,
      usersInPeriod,
      totalQueries,
      aiResponses: successfulQueries,
      totalInventory: totalSchemes + totalPolicies,
      successfulResponseRate,
      avgResponseTime
    },
    overTimeData,
    queryCategories,
    mostAskedPolicies,
    recentActivities,
    performanceTable,
    ragPerformance
  };
};
