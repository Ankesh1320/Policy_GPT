import { getCurrentUser } from "../services/userService.js";
import { getApplications } from "../services/applicationService.js";
import { successResponse } from "../../utils/apiResponse.js";

export const getApplicationsList = async (req, res) => {
  const user = await getCurrentUser();
  const applications = await getApplications(user._id);
  return successResponse(res, applications);
};