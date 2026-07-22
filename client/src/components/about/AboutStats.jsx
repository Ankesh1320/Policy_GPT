import React from 'react';

export default function AboutStats() {
  const stats = [
    { value: '2,400+', label: 'Government Schemes', valueColor: 'text-brand-blue-dark' },
    { value: '850+', label: 'Policies Indexed', valueColor: 'text-brand-orange' },
    { value: '48 Lakh+', label: 'Citizens Helped', valueColor: 'text-brand-blue-dark' },
    { value: '28', label: 'States & UTs Covered', valueColor: 'text-brand-orange' }
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-16 md:pb-24 lg:px-20">
      <div className="bg-white rounded-[20px] shadow-[0px_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:py-12 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 text-center divide-x divide-[#D9D9D9] max-md:[&>*:nth-child(2n+1)]:border-r max-md:[&>*:nth-child(2n)]:border-none">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center px-4">
              <span className={`font-heading text-3xl md:text-4xl font-extrabold mb-2 ${stat.valueColor}`}>
                {stat.value}
              </span>
              <span className="font-body text-xs md:text-sm font-semibold text-slate-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
