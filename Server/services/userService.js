import  User  from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

export const getCurrentUser = async () => {
  const user = await User.findOne().sort({ createdAt: 1 });
  if (!user) {
    throw new ApiError(404, "No user found. Has the database been seeded?");
  }
  return user;
};