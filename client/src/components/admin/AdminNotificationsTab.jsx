import React, { useEffect, useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import {
  fetchAdminNotifications,
  markAllAdminNotificationsRead,
  deleteAdminNotification,
} from "../../services/notificationService";
import NotificationRow from "../dashboard/NotificationRow";

const AdminNotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchAdminNotifications();
      setNotifications(response);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load notifications right now."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    if (!notifications.length || actionLoading) return;
    setActionLoading(true);
    try {
      await markAllAdminNotificationsRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to mark notifications as read."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (notificationId) => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      await deleteAdminNotification(notificationId);
      setNotifications((prev) => prev.filter((item) => item.id !== notificationId));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to delete the notification."
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full pb-6">

      {/* Header Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF1E3]">
              <Bell className="h-6 w-6 text-[#FD7A08]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
              <p className="mt-1 text-sm text-slate-500">
                Stay updated with the latest activities.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={!notifications.length || actionLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#FD7A08] hover:text-[#FD7A08] hover:bg-orange-50/20 shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckCircle2 className="h-4 w-4 text-[#FD7A08]" />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Table Card */}
      {isLoading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center text-sm text-slate-500">
          Loading your notifications...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-sm text-center text-sm text-slate-500">
          You have no notifications right now.
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm w-full overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_200px_100px_80px] gap-4 border-b border-gray-100 px-6 py-4 bg-card-orange">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Notification</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Date & Time</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Status</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Action</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                showDate
                showStatus
                showDelete
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationsTab;
