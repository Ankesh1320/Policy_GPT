import { getCurrentUser } from "./userService.js";
import { getSavedSchemes } from "./schemeService.js";
import { getApplications } from "./applicationService.js";
import { getNotifications } from "./notificationService.js";
import { getRecentSearches } from "./searchHistoryService.js";

export const getDashboardData = async () => {
  const user = await getCurrentUser();

  const [savedSchemes, applicationStatus, notifications, recentSearches] =
    await Promise.all([
      getSavedSchemes(user._id),
      getApplications(user._id),
      getNotifications(user._id),
      getRecentSearches(user._id),
    ]);

  return {
    user: {
      name: user.name,
      eligibleSchemes: user.eligibleSchemesCount,
      savedSchemes: user.savedSchemesCount,
      applications: user.applicationsCount,
      deadlines: user.deadlinesCount,
    },
    savedSchemes,
    applicationStatus,
    recentSearches,
    notifications,
  };
};