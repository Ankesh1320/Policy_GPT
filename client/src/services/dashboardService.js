import { apiClient } from "./apiClient";

export const fetchDashboard = async () => {
  const { data } = await apiClient.get("/dashboard");
  return data.data;
};

export const fetchUser = async () => {
  const { data } = await apiClient.get("/user");
  return data.data;
};

export const fetchSchemes = async () => {
  const { data } = await apiClient.get("/schemes");
  return data.data;
};

export const fetchApplications = async () => {
  const { data } = await apiClient.get("/applications");
  return data.data;
};

export const fetchNotifications = async () => {
  const { data } = await apiClient.get("/notifications");
  return data.data;
};