import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function ManagementSections() {
  const [activeSchemeTab, setActiveSchemeTab] = useState('All Schemes');
  const [activePolicyTab, setActivePolicyTab] = useState('All Policies');

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Scheme Management */}
      <div className="flex flex-col rounded-2xl border border-border-light bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Scheme Management</h2>
          <button className="text-sm font-semibold text-brand-orange hover:text-orange-600">View all</button>
        </div>
        
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['All Schemes', 'Pending Review', 'Approved', 'Draft', 'Expired'].map(tab => (
            <button 
              key={tab} 
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeSchemeTab === tab 
                  ? 'bg-orange-50 text-brand-orange' 
                  : 'bg-gray-50 text-text-secondary hover:bg-gray-100 hover:text-text-primary'
              }`}
              onClick={() => setActiveSchemeTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="mb-5 flex flex-col gap-3">
          <div className="rounded-lg border border-border-light bg-gray-50 p-6 text-center text-sm text-text-secondary">
            No schemes available
          </div>
        </div>
        
        <div className="mt-auto flex justify-center">
          <Button variant="primary" icon={<ArrowRight size={16} />}>
            Manage All Schemes
          </Button>
        </div>
      </div>

      {/* Policy Management */}
      <div className="flex flex-col rounded-2xl border border-border-light bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Policy Management</h2>
          <button className="text-sm font-semibold text-brand-orange hover:text-orange-600">View all</button>
        </div>
        
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['All Policies', 'Published', 'Draft', 'Archived'].map(tab => (
            <button 
              key={tab} 
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activePolicyTab === tab 
                  ? 'bg-orange-50 text-brand-orange' 
                  : 'bg-gray-50 text-text-secondary hover:bg-gray-100 hover:text-text-primary'
              }`}
              onClick={() => setActivePolicyTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="mb-5 flex flex-col gap-3">
          <div className="rounded-lg border border-border-light bg-gray-50 p-6 text-center text-sm text-text-secondary">
            No policies available
          </div>
        </div>
        
        <div className="mt-auto flex justify-center">
          <Button variant="primary" icon={<ArrowRight size={16} />}>
            Manage All Policies
          </Button>
        </div>
      </div>
    </section>
  );
}
