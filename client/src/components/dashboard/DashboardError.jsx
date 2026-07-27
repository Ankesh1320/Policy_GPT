import React from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

/**
 * Error fallback shown when the dashboard fetch fails.
 * `onRetry` re-triggers useDashboard()'s load function.
 */
const DashboardError = ({ message, onRetry }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-8">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" strokeWidth={2} />
      </div>
      <p className="text-lg font-semibold text-gray-900 mb-1">
        Couldn't load your dashboard
      </p>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        {message || "Something went wrong. Please check your connection and try again."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors rounded-full px-5 py-2.5"
      >
        <RotateCw className="w-4 h-4" strokeWidth={2} />
        Retry
      </button>
    </div>
  );
};

export default DashboardError;