import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/navbar/sidebar";
import WelcomeCard from "../components/dashboard/welcomecard";
import StatCards from "../components/dashboard/StatCards";
import SavedSchemes from "../components/dashboard/SavedSchemes";
import ApplicationStatus from "../components/dashboard/ApplicationStatus";
import RecentSearches from "../components/dashboard/RecentSearches";
import Notifications from "../components/dashboard/Notifications";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import DashboardError from "../components/dashboard/DashboardError";
import { useDashboard } from "../hooks/useDashboard";

const CitizenDashboard = () => {
  const { data, isLoading, isError, error, retry } = useDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          userName={data?.user?.fullName}
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8 flex flex-col gap-6">
          {isLoading && <DashboardSkeleton />}

          {isError && <DashboardError message={error} onRetry={retry} />}

          {!isLoading && !isError && data && (
            <>
              <WelcomeCard
                name={data.user.fullName}
                eligibleSchemes={data.stats.eligibleSchemes}
                deadlines={data.stats.deadlines}
              />
              <StatCards stats={data.stats} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SavedSchemes schemes={data.savedSchemes} />
                </div>

                <div className="flex flex-col gap-6">
                  <ApplicationStatus applications={data.applicationStatus} />
                  <RecentSearches searches={data.recentSearches} />
                  <Notifications notifications={data.notifications} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CitizenDashboard;