import { getCurrentUser } from "../services/userService.js";
import { successResponse } from "../../utils/apiResponse.js";

export const getUser = async (req, res) => {
  const user = await getCurrentUser();
  return successResponse(res, {
    name: user.name,
    email: user.email,
    eligibleSchemes: user.eligibleSchemesCount,
    savedSchemes: user.savedSchemesCount,
    applications: user.applicationsCount,
    deadlines: user.deadlinesCount,
  });
};