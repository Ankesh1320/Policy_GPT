import React from "react";
import { ArrowRight } from "lucide-react";

const WelcomeCard = ({ name, eligibleSchemes, deadlines, onUpdateProfile }) => {
  return (
    <section className="w-full rounded-2xl bg-[#EAEEF9] px-10 py-8 flex items-center justify-between gap-6">
      <div>
        <p className="text-[15px] text-gray-500">Welcome back,</p>

        <h1 className="font-heading mt-1 flex items-center gap-2 text-[32px] font-bold text-gray-900">
          {name}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </h1>

        <p className="mt-3 text-[15px] text-gray-600">
          You have{" "}
          <span className="font-semibold text-green-600">
            {eligibleSchemes} eligible schemes
          </span>{" "}
          and{" "}
          <span className="font-semibold text-orange-600">
            {deadlines} deadlines
          </span>{" "}
          approaching this month.
        </p>
      </div>

      <button
        type="button"
        onClick={onUpdateProfile}
        className="hidden sm:inline-flex shrink-0 items-center gap-2 bg-[#F5C568] hover:bg-[#f0b94f] text-gray-900 font-medium text-[15px] rounded-full px-5 py-2.5 transition-colors"
      >
        Update Profile
        <ArrowRight className="w-4 h-4" strokeWidth={2} />
      </button>
    </section>
  );
};

export default WelcomeCard;