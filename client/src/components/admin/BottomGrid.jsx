import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const chartDataOptions = {
  'thisMonth': [
    { name: '1 Jul', total: 0, approved: 0, pending: 0 },
    { name: '5 Jul', total: 0, approved: 0, pending: 0 },
    { name: '10 Jul', total: 0, approved: 0, pending: 0 },
    { name: '15 Jul', total: 0, approved: 0, pending: 0 },
    { name: '20 Jul', total: 0, approved: 0, pending: 0 },
    { name: '25 Jul', total: 0, approved: 0, pending: 0 },
    { name: '30 Jul', total: 0, approved: 0, pending: 0 },
  ],
  'prevMonth': [
    { name: '1 Jun', total: 0, approved: 0, pending: 0 },
    { name: '5 Jun', total: 0, approved: 0, pending: 0 },
    { name: '10 Jun', total: 0, approved: 0, pending: 0 },
    { name: '15 Jun', total: 0, approved: 0, pending: 0 },
    { name: '20 Jun', total: 0, approved: 0, pending: 0 },
    { name: '25 Jun', total: 0, approved: 0, pending: 0 },
    { name: '30 Jun', total: 0, approved: 0, pending: 0 },
  ],
  'last6Months': [
    { name: 'Feb', total: 0, approved: 0, pending: 0 },
    { name: 'Mar', total: 0, approved: 0, pending: 0 },
    { name: 'Apr', total: 0, approved: 0, pending: 0 },
    { name: 'May', total: 0, approved: 0, pending: 0 },
    { name: 'Jun', total: 0, approved: 0, pending: 0 },
    { name: 'Jul', total: 0, approved: 0, pending: 0 },
  ],
  'last12Months': [
    { name: 'Aug', total: 0, approved: 0, pending: 0 },
    { name: 'Oct', total: 0, approved: 0, pending: 0 },
    { name: 'Dec', total: 0, approved: 0, pending: 0 },
    { name: 'Feb', total: 0, approved: 0, pending: 0 },
    { name: 'Apr', total: 0, approved: 0, pending: 0 },
    { name: 'Jun', total: 0, approved: 0, pending: 0 },
  ]
};

const pieData = [
  { name: 'Agriculture', value: 0, color: '#3b82f6' },
  { name: 'Healthcare', value: 0, color: '#10b981' },
  { name: 'Housing', value: 0, color: '#f97316' },
  { name: 'Education', value: 0, color: '#8b5cf6' },
  { name: 'Others', value: 0, color: '#d1d5db' },
];

const timeRangeLabels = {
  'thisMonth': 'This Month',
  'prevMonth': 'Previous Month',
  'last6Months': 'Last 6 Months',
  'last12Months': 'Last 12 Months'
};

export default function BottomGrid() {
  const [timeRange, setTimeRange] = useState('thisMonth');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const currentChartData = chartDataOptions[timeRange];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Applications Overview (Line Chart) */}
      <div className="flex flex-col rounded-2xl border border-border-light bg-white p-6 shadow-sm lg:col-span-6 xl:col-span-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Applications Overview</h2>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-1 rounded-lg border border-border-light bg-white px-3 py-1.5 text-xs font-medium text-text-secondary"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {timeRangeLabels[timeRange]} <ChevronDown size={14} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-border-light bg-white p-2 shadow-lg">
                {Object.entries(timeRangeLabels).map(([value, label]) => (
                  <button 
                    key={value}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      timeRange === value 
                        ? 'bg-orange-50 text-brand-orange' 
                        : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                    }`}
                    onClick={() => {
                      setTimeRange(value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-5 flex gap-6">
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-1.5 text-sm text-text-secondary">
              <div className="h-2 w-2 rounded-full bg-brand-orange"></div>
              Total
            </div>
            <div className="text-lg font-bold text-text-primary">0</div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-1.5 text-sm text-text-secondary">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              Approved
            </div>
            <div className="text-lg font-bold text-text-primary">0</div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-1.5 text-sm text-text-secondary">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Pending
            </div>
            <div className="text-lg font-bold text-text-primary">0</div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              <Line type="monotone" dataKey="approved" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              <Line type="monotone" dataKey="pending" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Applications by Category (Donut Chart) */}
      <div className="flex flex-col rounded-2xl border border-border-light bg-white p-6 shadow-sm lg:col-span-6 xl:col-span-3">
        <h2 className="mb-5 text-lg font-bold text-text-primary">Applications by Category</h2>
        <div className="relative flex h-[200px] flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute text-center">
            <div className="text-2xl font-bold text-text-primary">0</div>
            <div className="text-sm text-text-secondary">Total</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {pieData.map((entry, idx) => (
            <div className="flex items-center gap-2 text-xs text-text-secondary" key={idx}>
              <div className="h-2 w-2 rounded-full" style={{backgroundColor: entry.color}}></div>
              <span className="flex-1">{entry.name} <span className="font-bold text-text-primary">{entry.value}%</span></span>
              <span className="text-text-muted">(0)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="flex flex-col rounded-2xl border border-border-light bg-white p-6 shadow-sm lg:col-span-12 xl:col-span-4">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Recent Activities</h2>
          <button className="text-sm font-semibold text-brand-orange hover:text-orange-600">View all</button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-border-light bg-gray-50 p-6 text-center text-sm text-text-secondary">
            No recent activities
          </div>
        </div>
      </div>
    </section>
  );
}
