import { apiClient } from "./apiClient";

export const sendFeedback = async (feedbackData) => {
  try {
    const { data } = await apiClient.post("/feedback", feedbackData);
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to send feedback";
    const newError = new Error(message);
    newError.errors = error.response?.data?.errors || {};
    throw newError;
  }
};
