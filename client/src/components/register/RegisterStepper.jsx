import { HiCheck } from "react-icons/hi2";

function StepCircle({ step, currentStep, label }) {
  const isCompleted = step < currentStep;
  const isActive = step === currentStep;

  if (isCompleted) {
    return (
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#08e02f] transition-all duration-300">
        <HiCheck className="h-4 w-4 text-white" aria-hidden="true" />
        <span className="sr-only">Step {label} completed</span>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#fd7a08] text-sm font-semibold text-white transition-all duration-300">
        {label}
      </div>
    );
  }

  return (
    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[rgba(113,106,106,0.37)] text-sm font-semibold text-[#797875] transition-all duration-300">
      {label}
    </div>
  );
}

function Connector({ completed }) {
  return (
    <div
      className={`h-0.5 w-7 transition-colors duration-300 ${
        completed ? "bg-[#fd7a08]" : "bg-[rgba(113,106,106,0.37)]"
      }`}
    />
  );
}

function RegisterStepper({ currentStep }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-0" aria-label={`Registration step ${currentStep} of 3`}>
      <StepCircle step={1} currentStep={currentStep} label={1} />
      <Connector completed={currentStep > 1} />
      <StepCircle step={2} currentStep={currentStep} label={2} />
      <Connector completed={currentStep > 2} />
      <StepCircle step={3} currentStep={currentStep} label={3} />
    </div>
  );
}

export default RegisterStepper;
