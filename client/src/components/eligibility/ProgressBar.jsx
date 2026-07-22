import React from "react";

export default function ProgressBar({ currentStep, totalSteps = 5 }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-[800px] mx-auto mb-6">
      {/* Label */}
      <div className="flex justify-between items-center mb-2.5">
        <span className="font-body text-xs sm:text-sm font-semibold text-text-secondary">
          Question {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Progress Track */}
      <div className="relative w-full">
        {/* Bottom 5 Segmented Light Bars */}
        <div className="grid grid-cols-5 gap-2 w-full">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2.5 rounded-full transition-colors ${
                s <= currentStep ? "bg-brand-orange/20" : "bg-border-light"
              }`}
            />
          ))}
        </div>

        {/* Top Active Orange Progress Bar Overlay */}
        <div
          className="absolute top-0 left-0 h-2.5 bg-brand-orange rounded-full transition-all duration-300 ease-out shadow-btn"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
