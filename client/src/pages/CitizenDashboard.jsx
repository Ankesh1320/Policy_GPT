import React from "react";
import Navbar from "../components/Navbar/Navbar";
import WelcomeCard from "../components/Dashboard/WelcomeCard";
import StatCards from "../components/Dashboard/StatCards";
import SavedSchemes from "../components/Dashboard/SavedSchemes";
import ApplicationStatus from "../components/Dashboard/ApplicationStatus";
import RecentSearches from "../components/Dashboard/RecentSearches";
import Notifications from "../components/Dashboard/Notifications";

const CitizenDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FDF9F2]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-8 py-8 flex flex-col gap-6">
        <WelcomeCard />
        <StatCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SavedSchemes />
          </div>

          <div className="flex flex-col gap-6">
            <ApplicationStatus />
            <RecentSearches />
            <Notifications />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;