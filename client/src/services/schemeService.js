import { apiClient } from "./apiClient";

export const schemeService = {
  getAll: async (params) => {
    const { data } = await apiClient.get("/schemes", { params });
    return data.data;
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/schemes/${id}`);
    return data.data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/schemes", payload);
    return data.data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/schemes/${id}`, payload);
    return data.data;
  },
  remove: async (id) => {
    const { data } = await apiClient.delete(`/schemes/${id}`);
    return data.data;
  },
  save: async (id) => {
    const { data } = await apiClient.post(`/schemes/${id}/save`);
    return data.data;
  },
  unsave: async (id) => {
    const { data } = await apiClient.delete(`/schemes/${id}/save`);
    return data.data;
  },
  isSaved: async (id) => {
    const { data } = await apiClient.get(`/schemes/${id}/is-saved`);
    return data.data.isSaved;
  },
  addSearchHistory: async (term) => {
    const { data } = await apiClient.post("/schemes/search-history", { term });
    return data.data;
  },
};
