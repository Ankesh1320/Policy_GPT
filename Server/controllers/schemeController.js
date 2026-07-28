import { getSavedSchemes } from "../services/schemeService.js";
import { successResponse } from "../utils/apiResponse.js";

export const getSchemes = async (req, res) => {
  const user = req.user;
  const schemes = await getSavedSchemes(user._id);
  return successResponse(res, schemes);
};