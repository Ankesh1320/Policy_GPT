import { 
  Shield, 
  LayoutDashboard, 
  Layers, 
  FileText, 
  Users, 
  Settings, 
  BarChart2, 
  FileBox,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-[260px] flex-col border-r border-border-light bg-white">
      <div className="flex items-center gap-3 p-6 text-xl font-bold text-text-primary">
        <Shield className="text-brand-orange" size={24} />
        <span>PolicyGPT</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-4">
        <div className="mb-6 flex items-center justify-between cursor-pointer rounded-lg bg-card-orange px-3 py-2.5 text-sm font-medium text-brand-orange transition-colors">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="mb-3 pl-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Management</div>
          <SidebarItem icon={<Layers size={18} />} text="Schedule Management" hasDropdown />
          <SidebarItem icon={<FileText size={18} />} text="Policy Management" hasDropdown />
          <SidebarItem icon={<FileBox size={18} />} text="Applications" />
          <SidebarItem icon={<Users size={18} />} text="Users" />
          <SidebarItem icon={<Settings size={18} />} text="Roles & Permissions" />
        </div>

        <div className="mb-6">
          <div className="mb-3 pl-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Analytics</div>
          <SidebarItem icon={<BarChart2 size={18} />} text="Analytics" />
          <SidebarItem icon={<FileText size={18} />} text="Reports" />
        </div>
        
        <div className="mb-6">
          <div className="mb-3 pl-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Content</div>
          <SidebarItem icon={<MessageSquare size={18} />} text="Notifications" />
          <SidebarItem icon={<HelpCircle size={18} />} text="FAQs" />
          <SidebarItem icon={<ImageIcon size={18} />} text="Banners" />
        </div>
      </nav>
      
      <div className="border-t border-border-light p-6">
        <Link to="/" className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-light bg-white p-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-50 hover:text-text-primary">
          <ArrowRight size={16} className="rotate-180" />
          Back to Main Site
        </Link>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, hasDropdown }) {
  return (
    <div className="mb-1 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-50 hover:text-text-primary">
      <div className="flex items-center gap-3">
        {icon}
        <span>{text}</span>
      </div>
      {hasDropdown && <ChevronDown size={16} />}
    </div>
  );
}
