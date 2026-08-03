import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatsGrid from '../../components/admin/StatsGrid';
import ManagementSections from '../../components/admin/ManagementSections';
import BottomGrid from '../../components/admin/BottomGrid';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  return (
    <div className="h-screen flex overflow-hidden bg-cream font-body">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header (Navbar) */}
        <AdminHeader onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8 flex flex-col gap-6">
          {/* Welcome Banner */}
          <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-gradient-to-r from-[#F7D2A8] via-white to-[#D8F3E3] border border-[#E2E8F0] p-6 shadow-sm gap-4">
            <div>
              <p className="mb-1 text-[13px] text-gray-500 font-medium">Welcome back,</p>
              <h1 className="flex items-center gap-2 font-heading text-[28px] font-bold text-gray-900 leading-tight">
                Admin 👋
              </h1>
              <p className="mt-2 text-sm text-gray-500 font-normal">Here's what's happening with your platform today.</p>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-[#F2762E] hover:bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer shrink-0">
              View Reports
              <ArrowRight size={16} />
            </button>
          </section>

          {/* Stats Grid */}
          <StatsGrid />

          {/* Management Sections */}
          <ManagementSections />

          {/* Bottom Grid */}
          <BottomGrid />
        </main>
      </div>
    </div>
  );
}
