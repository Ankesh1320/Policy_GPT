import { getDashboardData } from "../services/dashboardService.js";
import { successResponse } from "../utils/apiResponse.js";

export const getDashboard = async (req, res) => {
  const data = await getDashboardData(req.user);
  return successResponse(res, data);
};