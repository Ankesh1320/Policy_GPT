import { SearchHistory } from "../models/SearchHistory.js";

export const getRecentSearches = async (userId, limit = 5) => {
  const history = await SearchHistory.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return history.map((h) => h.term);
};