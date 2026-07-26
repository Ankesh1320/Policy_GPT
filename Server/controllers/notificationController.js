import { getCurrentUser } from "../services/userService.js";
import { getNotifications } from "../services/notificationService.js";
import { successResponse } from "../utils/apiResponse.js";

export const getNotificationsList = async (req, res) => {
  const user = await getCurrentUser();
  const notifications = await getNotifications(user._id);
  return successResponse(res, notifications);
};