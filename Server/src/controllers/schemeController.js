import { getCurrentUser } from "../services/userService.js";
import { getSavedSchemes } from "../services/schemeService.js";
import { successResponse } from "../../utils/apiResponse.js";

export const getSchemes = async (req, res) => {
  const user = await getCurrentUser();
  const schemes = await getSavedSchemes(user._id);
  return successResponse(res, schemes);
};