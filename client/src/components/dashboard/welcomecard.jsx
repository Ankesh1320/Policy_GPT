import React from "react";
import { ArrowRight } from "lucide-react";

const WelcomeCard = ({ name, eligibleSchemes, deadlines, onUpdateProfile }) => {
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-gradient-to-r from-[#F7D2A8] via-white to-[#D8F3E3] border border-[#E2E8F0] p-6 shadow-sm gap-4">
      <div>
        <p className="mb-1 text-[13px] text-gray-500 font-medium">Welcome back,</p>
        <h1 className="flex items-center gap-2 font-heading text-[28px] font-bold text-gray-900 leading-tight">
          {name} 👋
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-normal">
          You have{" "}
          <span className="font-bold text-[#10B981]">
            {eligibleSchemes ?? 0} eligible schemes
          </span>{" "}
          and{" "}
          <span className="font-bold text-[#F97316]">
            {deadlines ?? 0} deadlines
          </span>{" "}
          approaching this month.
        </p>
      </div>

      <button
        type="button"
        onClick={onUpdateProfile}
        className="flex items-center gap-2 rounded-full bg-[#F2762E] hover:bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer shrink-0"
      >
        Update Profile
        <ArrowRight size={16} />
      </button>
    </section>
  );
};

export default WelcomeCard;