import { Notification } from "../models/Notification.js";
import { timeAgo } from "../../utils/timeAgo.js";

export const getNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

  return notifications.map((n) => ({
    id: n._id,
    title: n.title,
    time: timeAgo(n.createdAt),
    dotColor: n.isRead ? null : "bg-orange-500",
  }));
};