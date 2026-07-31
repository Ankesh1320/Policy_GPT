import { apiClient } from "./apiClient";

export const policyService = {
  getAll: async (params) => {
    const { data } = await apiClient.get("/policies", { params });
    return data.data;
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/policies/${id}`);
    return data.data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/policies", payload);
    return data.data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/policies/${id}`, payload);
    return data.data;
  },
  remove: async (id) => {
    const { data } = await apiClient.delete(`/policies/${id}`);
    return data.data;
  },
};
