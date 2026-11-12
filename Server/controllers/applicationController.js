import { getApplications } from "../services/applicationService.js";
import { successResponse } from "../utils/apiResponse.js";

export const getApplicationsList = async (req, res) => {
  const user = req.user;
  const applications = await getApplications(user._id);
  return successResponse(res, applications);
};