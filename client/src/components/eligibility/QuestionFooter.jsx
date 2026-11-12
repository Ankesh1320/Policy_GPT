import React from "react";

export default function QuestionFooter({ currentStep, onPrevious }) {
  return (
    <div className="flex items-center justify-between mt-8 pt-4 border-t border-transparent">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`flex items-center gap-2 font-body text-sm font-semibold transition-colors ${
          currentStep === 1
            ? "text-text-placeholder cursor-not-allowed"
            : "text-text-muted hover:text-text-primary cursor-pointer"
        }`}
      >
        <span>←</span> Previous
      </button>

      {/* Select option helper text */}
      <span className="font-body text-xs sm:text-sm font-medium text-text-secondary">
        Select an option to continue
      </span>
    </div>
  );
}
