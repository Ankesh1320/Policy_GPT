import { Notification } from "../models/Notification.js";
import { timeAgo } from "../utils/timeAgo.js";

const formatNotifications = (notifications) =>
  notifications.map((n) => ({
    id: n._id,
    title: n.title,
    time: timeAgo(n.createdAt),
    dateTime: new Date(n.createdAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    isRead: Boolean(n.isRead),
  }));

// ── Citizen notifications (per-user) ──────────────────────────────
export const getNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId, role: "citizen" })
    .sort({ createdAt: -1 })
    .lean();
  return formatNotifications(notifications);
};

export const markAllNotificationsRead = async (userId) => {
  await Notification.updateMany(
    { user: userId, role: "citizen", isRead: false },
    { isRead: true }
  );
};

export const deleteNotification = async (userId, notificationId) => {
  await Notification.findOneAndDelete({ _id: notificationId, user: userId });
};

// ── Admin notifications (shared, no per-user) ─────────────────────
export const getAdminNotifications = async () => {
  const notifications = await Notification.find({ role: "admin" })
    .sort({ createdAt: -1 })
    .lean();
  return formatNotifications(notifications);
};

export const markAllAdminNotificationsRead = async () => {
  await Notification.updateMany({ role: "admin", isRead: false }, { isRead: true });
};

export const deleteAdminNotification = async (notificationId) => {
  await Notification.findOneAndDelete({ _id: notificationId, role: "admin" });
};