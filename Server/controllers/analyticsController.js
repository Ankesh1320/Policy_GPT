import { getAnalyticsData } from "../services/analyticsService.js";
import { successResponse } from "../utils/apiResponse.js";

export const getAnalytics = async (req, res) => {
  const { timeRange, startDate: customStart, endDate: customEnd, isDemo } = req.query;

  const now = new Date();
  let startDate = new Date();
  let endDate = now;

  if (customStart && customEnd) {
    startDate = new Date(customStart);
    endDate = new Date(customEnd);
  } else {
    switch (timeRange) {
      case "last7Days":
        startDate.setDate(now.getDate() - 7);
        break;
      case "last30Days":
        startDate.setDate(now.getDate() - 30);
        break;
      case "thisMonth":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "allTime":
        startDate = new Date(2000, 0, 1); // Long ago to cover everything
        break;
      default:
        // Default to last 30 days
        startDate.setDate(now.getDate() - 30);
        break;
    }
  }

  const isDemoBool = isDemo === "true";
  const data = await getAnalyticsData(startDate, endDate, isDemoBool);
  return successResponse(res, data);
};
