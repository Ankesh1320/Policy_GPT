import { apiClient } from "./apiClient";

// ── Citizen notifications ──────────────────────────────────────────
export const fetchNotifications = async () => {
  const { data } = await apiClient.get("/notifications");
  return data.data;
};

export const markAllNotificationsRead = async () => {
  const { data } = await apiClient.patch("/notifications/read-all");
  return data.data;
};

export const deleteNotification = async (id) => {
  const { data } = await apiClient.delete(`/notifications/${id}`);
  return data.data;
};

// ── Admin notifications ────────────────────────────────────────────
export const fetchAdminNotifications = async () => {
  const { data } = await apiClient.get("/notifications/admin");
  return data.data;
};

export const markAllAdminNotificationsRead = async () => {
  const { data } = await apiClient.patch("/notifications/admin/read-all");
  return data.data;
};

export const deleteAdminNotification = async (id) => {
  const { data } = await apiClient.delete(`/notifications/admin/${id}`);
  return data.data;
};
