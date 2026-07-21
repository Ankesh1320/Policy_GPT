import { ArrowRight } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatsGrid from '../../components/admin/StatsGrid';
import ManagementSections from '../../components/admin/ManagementSections';
import BottomGrid from '../../components/admin/BottomGrid';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-body">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-[260px] flex flex-1 flex-col gap-6 p-8">
        {/* Header */}
        <AdminHeader />

        {/* Welcome Banner */}
        <section className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 shadow-sm">
          <div>
            <p className="mb-1 text-sm text-text-secondary">Welcome back,</p>
            <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-heading-charcoal">
              Admin 👋
            </h1>
            <p className="mt-2 text-sm text-text-secondary">Here's what's happening with your platform today.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-btn-yellow px-5 py-2.5 text-sm font-semibold text-heading-charcoal shadow-btn transition-colors hover:bg-brand-orange hover:text-white">
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
  );
}
