import { Menu, Bell, ChevronDown } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="mb-2 flex items-center justify-between">
      <button className="text-text-secondary transition-colors hover:text-text-primary">
        <Menu size={24} />
      </button>
      
      <div className="flex items-center gap-5">
        <button className="relative text-text-secondary transition-colors hover:text-text-primary">
          <Bell size={20} />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-bg-surface bg-red-500"></span>
        </button>
        
        <div className="flex cursor-pointer items-center gap-3 rounded-full border border-border-light bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white">
            A
          </div>
          <span className="text-sm font-medium text-text-primary">Admin</span>
          <ChevronDown size={16} className="text-text-secondary" />
        </div>
      </div>
    </header>
  );
}
