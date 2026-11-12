import { successResponse } from "../utils/apiResponse.js";

export const getUser = async (req, res) => {
  const user = req.user;
  return successResponse(res, {
    name: user.fullName || user.name,
    email: user.email,
    eligibleSchemes: user.eligibleSchemesCount,
    savedSchemes: user.savedSchemesCount,
    applications: user.applicationsCount,
    deadlines: user.deadlinesCount,
  });
};