import {
  getNotifications,
  markAllNotificationsRead,
  deleteNotification,
  getAdminNotifications,
  markAllAdminNotificationsRead,
  deleteAdminNotification,
} from "../services/notificationService.js";
import { successResponse } from "../utils/apiResponse.js";

// ── Citizen controllers ────────────────────────────────────────────
export const getNotificationsList = async (req, res) => {
  const notifications = await getNotifications(req.user._id);
  return successResponse(res, notifications);
};

export const markAllNotificationsReadController = async (req, res) => {
  await markAllNotificationsRead(req.user._id);
  return successResponse(res, { message: "Notifications marked as read." });
};

export const deleteNotificationController = async (req, res) => {
  const { id } = req.params;
  await deleteNotification(req.user._id, id);
  return successResponse(res, { message: "Notification deleted." });
};

// ── Admin controllers ──────────────────────────────────────────────
export const getAdminNotificationsList = async (req, res) => {
  const notifications = await getAdminNotifications();
  return successResponse(res, notifications);
};

export const markAllAdminNotificationsReadController = async (req, res) => {
  await markAllAdminNotificationsRead();
  return successResponse(res, { message: "Admin notifications marked as read." });
};

export const deleteAdminNotificationController = async (req, res) => {
  const { id } = req.params;
  await deleteAdminNotification(id);
  return successResponse(res, { message: "Admin notification deleted." });
};