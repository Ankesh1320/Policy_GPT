import { FileBox, Shield, Users, FileText, Bell, FileCheck } from 'lucide-react';

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <AdminStatCard 
        icon={<FileBox size={20} className="text-indigo-600" />} 
        iconBg="bg-indigo-50"
        value="0" 
        label="Total Schemes" 
        trend="0" 
        trendLabel="this month" 
      />
      <AdminStatCard 
        icon={<Shield size={20} className="text-emerald-500" />} 
        iconBg="bg-emerald-100"
        value="0" 
        label="Total Policies" 
        trend="0" 
        trendLabel="this month" 
      />
      <AdminStatCard 
        icon={<Users size={20} className="text-orange-500" />} 
        iconBg="bg-orange-50"
        value="0" 
        label="Total Users" 
        trend="0%" 
        trendLabel="this month" 
      />
      <AdminStatCard 
        icon={<FileText size={20} className="text-purple-500" />} 
        iconBg="bg-purple-100"
        value="0" 
        label="Applications" 
        trend="0%" 
        trendLabel="this month" 
      />
      <AdminStatCard 
        icon={<Bell size={20} className="text-blue-500" />} 
        iconBg="bg-blue-50"
        value="0" 
        label="Pending Approvals" 
        trend="0" 
        trendLabel="since yesterday" 
      />
      <AdminStatCard 
        icon={<FileCheck size={20} className="text-green-500" />} 
        iconBg="bg-green-100"
        value="0" 
        label="Approved" 
        trend="0%" 
        trendLabel="this month" 
      />
    </section>
  );
}

function AdminStatCard({ icon, iconBg, value, label, trend, trendLabel }) {
  return (
    <article className="flex flex-col items-center justify-center rounded-2xl bg-white p-5 shadow-sm border border-border-light transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div className="mb-1 text-2xl font-bold text-text-primary">{value}</div>
      <div className="mb-3 w-full truncate text-center text-xs font-medium text-text-secondary">
        {label}
      </div>
      <div className="flex items-center gap-1 text-xs font-medium">
        <span className="text-text-primary">{trend}</span>
        <span className="text-text-muted">{trendLabel}</span>
      </div>
    </article>
  );
}
