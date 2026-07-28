import { getSavedSchemes } from "./schemeService.js";
import { getApplications } from "./applicationService.js";
import { getNotifications } from "./notificationService.js";
import { getRecentSearches } from "./searchHistoryService.js";
import Scheme from "../models/Scheme.js";
import { sampleSchemes } from "./eligibilityService.js";

export const getDashboardData = async (user) => {
  const [savedSchemes, applicationStatus, notifications, recentSearches] =
    await Promise.all([
      getSavedSchemes(user._id),
      getApplications(user._id),
      getNotifications(user._id),
      getRecentSearches(user._id),
    ]);

  let dbSchemes = [];
  try {
    dbSchemes = await Scheme.find().lean();
  } catch (err) {
    console.warn("DB query failed, fallback to static dataset:", err.message);
  }

  const allSchemes = dbSchemes && dbSchemes.length > 0 ? dbSchemes : sampleSchemes;

  let eligibleSchemesCount = 0;
  let deadlinesCount = 0;

  for (const scheme of allSchemes) {
    let score = 0;
    const maxScore = 4;

    // 1. Category (always matches or general)
    score += 1;

    // 2. State match
    const states = scheme.eligibilityCriteria?.states || ["All India"];
    if (!user.state || states.includes("All India") || states.includes(user.state)) {
      score += 1;
    }

    // 3. Occupation match
    const occupations = scheme.eligibilityCriteria?.occupations || ["Any"];
    if (!user.occupation || occupations.includes("Any") || occupations.includes(user.occupation)) {
      score += 1;
    }

    // 4. Income match
    const incomeRanges = scheme.eligibilityCriteria?.incomeRanges || ["All"];
    if (!user.incomeRange || incomeRanges.includes("All") || incomeRanges.includes(user.incomeRange)) {
      score += 1;
    }

    const matchPercentage = Math.round((score / maxScore) * 100);
    if (matchPercentage >= 85) {
      eligibleSchemesCount += 1;
      if (scheme.deadline && scheme.deadline.toLowerCase() !== "ongoing") {
        deadlinesCount += 1;
      }
    }
  }

  return {
    user: {
      fullName: user.fullName,
      email: user.email,
      name: user.fullName, // Fallback for UI components expecting user.name
    },
    stats: {
      eligibleSchemes: eligibleSchemesCount,
      savedSchemes: savedSchemes.length,
      applications: applicationStatus.length,
      deadlines: deadlinesCount,
    },
    // Keep these fields for frontend compatibility
    savedSchemes,
    applicationStatus,
    recentApplications: applicationStatus, // requirement 4 key
    recentSearches,
    notifications,
  };
};