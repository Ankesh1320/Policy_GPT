import { SavedScheme } from "../models/SavedScheme.js";

export const getSavedSchemes = async (userId) => {
  return SavedScheme.find({ user: userId }).sort({ createdAt: -1 }).lean();
};