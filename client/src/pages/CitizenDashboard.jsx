import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Navbar/Sidebar";
import WelcomeCard from "../components/Dashboard/WelcomeCard";
import StatCards from "../components/Dashboard/StatCards";
import SavedSchemes from "../components/Dashboard/SavedSchemes";
import ApplicationStatus from "../components/Dashboard/ApplicationStatus";
import RecentSearches from "../components/Dashboard/RecentSearches";
import Notifications from "../components/Dashboard/Notifications";
import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";
import DashboardError from "../components/Dashboard/DashboardError";
import { useDashboard } from "../hooks/useDashboard";

const CitizenDashboard = () => {
  const { data, isLoading, isError, error, retry } = useDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF9F2]">
      <Navbar
        userName={data?.user?.name}
        onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 px-8 py-8 flex flex-col gap-6">
          {isLoading && <DashboardSkeleton />}

          {isError && <DashboardError message={error} onRetry={retry} />}

          {!isLoading && !isError && data && (
            <>
              <WelcomeCard
                name={data.user.name}
                eligibleSchemes={data.user.eligibleSchemes}
                deadlines={data.user.deadlines}
              />
              <StatCards stats={data.user} />

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