import { useState, useEffect, useCallback } from "react";
import { fetchDashboard } from "../services/dashboardService";

/**
 * Loads the full Citizen Dashboard payload and exposes loading/error/retry
 * state so the page can render skeletons, an error fallback, or the real UI.
 */
export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const result = await fetchDashboard();
      setData(result);
      setStatus("success");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while loading your dashboard."
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    isLoading: status === "loading",
    isError: status === "error",
    error,
    retry: load,
  };
};