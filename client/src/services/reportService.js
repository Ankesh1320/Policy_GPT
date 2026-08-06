import { apiClient } from "./apiClient";

export const reportService = {
  generate: async (payload) => {
    const { data } = await apiClient.post("/reports/generate", payload, {
      responseType: "blob"
    });
    return data;
  }
};
