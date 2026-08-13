import { apiClient } from "./apiClient";

export const reportService = {
  generate: async (payload) => {
    const { data } = await apiClient.post("/reports/generate", payload, {
      responseType: "blob"
    });
    return data;
  },
  getHistory: async () => {
    const { data } = await apiClient.get("/reports");
    return data.data;
  },
  download: async (id, format) => {
    const { data } = await apiClient.get(`/reports/download/${id}?format=${format}`, {
      responseType: "blob"
    });
    return data;
  }
};
