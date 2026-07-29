import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Star, FileText, CheckCircle2, User, FileCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const chartDataOptions = {
  'thisMonth': [
    { name: '1 May', total: 400, approved: 250, pending: 150 },
    { name: '5 May', total: 350, approved: 200, pending: 100 },
    { name: '10 May', total: 500, approved: 320, pending: 180 },
    { name: '15 May', total: 450, approved: 300, pending: 150 },
    { name: '20 May', total: 580, approved: 400, pending: 220 },
    { name: '25 May', total: 520, approved: 380, pending: 160 },
    { name: '30 May', total: 650, approved: 450, pending: 250 },
  ],
  'prevMonth': [
    { name: '1 Apr', total: 300, approved: 180, pending: 120 },
    { name: '5 Apr', total: 420, approved: 280, pending: 140 },
    { name: '10 Apr', total: 380, approved: 220, pending: 160 },
    { name: '15 Apr', total: 480, approved: 310, pending: 170 },
    { name: '20 Apr', total: 510, approved: 350, pending: 160 },
    { name: '25 Apr', total: 490, approved: 330, pending: 160 },
    { name: '30 Apr', total: 600, approved: 400, pending: 200 },
  ],
  'last6Months': [
    { name: 'Dec', total: 2200, approved: 1500, pending: 700 },
    { name: 'Jan', total: 2500, approved: 1800, pending: 700 },
    { name: 'Feb', total: 2100, approved: 1400, pending: 700 },
    { name: 'Mar', total: 2800, approved: 2000, pending: 800 },
    { name: 'Apr', total: 3000, approved: 2200, pending: 800 },
    { name: 'May', total: 3256, approved: 2845, pending: 411 },
  ],
  'last12Months': [
    { name: 'Jun', total: 18000, approved: 13000, pending: 5000 },
    { name: 'Aug', total: 21000, approved: 15000, pending: 6000 },
    { name: 'Oct', total: 23000, approved: 16500, pending: 6500 },
    { name: 'Dec', total: 25000, approved: 18000, pending: 7000 },
    { name: 'Feb', total: 28000, approved: 21000, pending: 7000 },
    { name: 'Apr', total: 32000, approved: 24000, pending: 8000 },
  ]
};

const pieData = [
  { name: 'Agriculture', value: 35, count: 1140, color: '#f97316' },
  { name: 'Healthcare', value: 25, count: 814, color: '#10b981' },
  { name: 'Housing', value: 20, count: 652, color: '#3b82f6' },
  { name: 'Education', value: 10, count: 326, color: '#8b5cf6' },
  { name: 'Others', value: 10, count: 324, color: '#a3a3a3' },
];

const timeRangeLabels = {
  'thisMonth': 'This Month',
  'prevMonth': 'Previous Month',
  'last6Months': 'Last 6 Months',
  'last12Months': 'Last 12 Months'
};

const ACTIVITIES = [
  {
    title: 'New scheme "PM Surya Ghar Yojana" added',
    time: '2 hours ago',
    icon: Star,
    iconBg: 'bg-amber-50 text-amber-500'
  },
  {
    title: 'Policy "Digital India Policy" updated',
    time: '5 hours ago',
    icon: FileText,
    iconBg: 'bg-blue-50 text-blue-500'
  },
  {
    title: 'Application #APP12345 approved',
    time: '1 day ago',
    icon: CheckCircle2,
    iconBg: 'bg-green-50 text-green-500'
  },
  {
    title: 'User Ravi Kumar registered',
    time: '1 day ago',
    icon: User,
    iconBg: 'bg-indigo-50 text-indigo-500'
  },
  {
    title: 'Scheme "Startup India Initiative" published',
    time: '2 days ago',
    icon: FileCheck,
    iconBg: 'bg-purple-50 text-purple-500'
  }
];

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
      <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6 xl:col-span-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Applications Overview</h2>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {timeRangeLabels[timeRange]} <ChevronDown size={14} className="text-gray-400" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                {Object.entries(timeRangeLabels).map(([value, label]) => (
                  <button 
                    key={value}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${
                      timeRange === value 
                        ? 'bg-orange-50 text-[#F2762E]' 
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
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <div className="h-2 w-2 rounded-full bg-[#f97316]"></div>
              Total
            </div>
            <div className="text-lg font-bold text-gray-900">3,256</div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <div className="h-2 w-2 rounded-full bg-[#3b82f6]"></div>
              Approved
            </div>
            <div className="text-lg font-bold text-gray-900">2,845</div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <div className="h-2 w-2 rounded-full bg-[#10b981]"></div>
              Pending
            </div>
            <div className="text-lg font-bold text-gray-900">411</div>
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
      <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6 xl:col-span-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-5 text-lg font-bold text-gray-900">Applications by Category</h2>
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
            <div className="text-2xl font-bold text-gray-900">3,256</div>
            <div className="text-xs text-gray-500 font-medium">Total</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {pieData.map((entry, idx) => (
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500" key={idx}>
              <div className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: entry.color}}></div>
              <span className="flex-1 text-gray-600 font-semibold">{entry.name} <span className="font-bold text-gray-900">{entry.value}%</span></span>
              <span className="text-gray-400 font-medium">({entry.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-12 xl:col-span-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
          <button className="text-sm font-semibold text-brand-orange hover:text-orange-600 cursor-pointer">View all</button>
        </div>
        <div className="flex flex-col gap-4">
          {ACTIVITIES.map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-gray-900 leading-snug truncate">{activity.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
