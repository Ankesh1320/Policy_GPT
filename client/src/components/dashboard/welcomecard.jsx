import React from "react";

const WelcomeCard = ({ name, eligibleSchemes, deadlines }) => {
  return (
    <section className="w-full rounded-2xl bg-gradient-to-r from-green-50 via-green-50/70 to-orange-50 px-10 py-8">
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
    </section>
  );
};

export default WelcomeCard;