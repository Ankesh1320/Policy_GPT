import React from "react";
import OptionButton from "./OptionButton";
import QuestionFooter from "./QuestionFooter";

export default function QuestionCard({
  questionData,
  currentStep,
  selectedAnswer,
  onSelectOption,
  onPrevious,
}) {
  const { badge, question, helperText, options } = questionData;

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white rounded-[20px] p-6 sm:p-10 md:p-12 shadow-card border border-border-warm">
      {/* Step Badge */}
      <div className="w-11 h-11 rounded-full bg-card-orange text-brand-orange font-heading font-bold text-base flex items-center justify-center mb-6">
        {badge}
      </div>

      {/* Question Heading */}
      <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-heading leading-tight tracking-tight mb-2">
        {question}
      </h2>

      {/* Helper Text */}
      <p className="font-body text-sm sm:text-base text-text-secondary font-normal mb-8">
        {helperText}
      </p>

      {/* Options Stack */}
      <div className="space-y-3.5">
        {options.map((opt) => (
          <OptionButton
            key={opt}
            optionText={opt}
            isSelected={selectedAnswer === opt}
            onClick={onSelectOption}
          />
        ))}
      </div>

      {/* Question Footer */}
      <QuestionFooter currentStep={currentStep} onPrevious={onPrevious} />
    </div>
  );
}
