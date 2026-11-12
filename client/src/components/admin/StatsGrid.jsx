import { FileBox, Shield, Users, FileText, Bell, FileCheck } from 'lucide-react';

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <AdminStatCard 
        icon={<FileBox size={20} className="text-indigo-600" />} 
        iconBg="bg-indigo-50"
        value="128" 
        label="Total Schemes" 
        trend="12" 
        trendLabel="this month" 
        trendUp={true}
      />
      <AdminStatCard 
        icon={<Shield size={20} className="text-emerald-500" />} 
        iconBg="bg-emerald-50"
        value="45" 
        label="Total Policies" 
        trend="8" 
        trendLabel="this month" 
        trendUp={true}
      />
      <AdminStatCard 
        icon={<Users size={20} className="text-orange-500" />} 
        iconBg="bg-orange-50"
        value="12,540" 
        label="Total Users" 
        trend="18%" 
        trendLabel="this month" 
        trendUp={true}
      />
      <AdminStatCard 
        icon={<FileText size={20} className="text-purple-500" />} 
        iconBg="bg-purple-50"
        value="3,256" 
        label="Applications" 
        trend="15%" 
        trendLabel="this month" 
        trendUp={true}
      />
      <AdminStatCard 
        icon={<Bell size={20} className="text-blue-500" />} 
        iconBg="bg-blue-50"
        value="78" 
        label="Pending Approvals" 
        trend="5" 
        trendLabel="since yesterday" 
        trendUp={false}
      />
      <AdminStatCard 
        icon={<FileCheck size={20} className="text-green-500" />} 
        iconBg="bg-green-50"
        value="2,845" 
        label="Approved Applications" 
        trend="20%" 
        trendLabel="this month" 
        trendUp={true}
      />
    </section>
  );
}

function AdminStatCard({ icon, iconBg, value, label, trend, trendLabel, trendUp }) {
  return (
    <article className="flex flex-col items-center justify-center rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div className="mb-1 font-heading text-[26px] font-bold text-gray-900 leading-none">{value}</div>
      <div className="mb-3 w-full truncate text-center text-[13px] font-semibold text-gray-500 leading-tight">
        {label}
      </div>
      <div className="flex items-center gap-1 text-[11px] font-semibold">
        <span className={`flex items-center font-bold ${trendUp ? "text-emerald-600" : "text-rose-600"}`}>
          {trendUp ? "↑" : "↓"} {trend}
        </span>
        <span className="text-gray-400 font-normal">{trendLabel}</span>
      </div>
    </article>
  );
}
