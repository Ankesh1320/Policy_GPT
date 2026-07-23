import React from 'react';

const ContactInfo = () => {
  return (
    <aside className="flex flex-col gap-6 md:w-1/3">
      {/* Email Support Card */}
      <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff4e5] text-[#f97316]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-7 w-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold text-gray-800">Email Support</h3>
          <p className="text-sm font-medium text-gray-500">help@policygpt.in</p>
        </div>
      </div>

      {/* Helpline Card */}
      <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d1fae5] text-[#10b981]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-7 w-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold text-gray-800">Helpline</h3>
          <p className="text-sm font-medium text-gray-500">1800-XXX-XXXX (Toll Free)</p>
        </div>
      </div>

      {/* Office Card */}
      <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e0e7ff] text-[#6366f1]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-7 w-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold text-gray-800">Office</h3>
          <p className="text-sm font-medium text-gray-500">New Delhi, India — 110001</p>
        </div>
      </div>
    </aside>
  );
};

export default ContactInfo;
