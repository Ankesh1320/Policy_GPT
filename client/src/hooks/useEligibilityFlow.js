import { useState } from "react";
import { questionsData, checkEligibilityAPI } from "../services/eligibilityService";

export const useEligibilityFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    category: "",
    ageGroup: "",
    income: "",
    state: "",
    occupation: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const currentQuestion = questionsData.find((q) => q.step === currentStep) || questionsData[0];

  const handleSelectOption = async (selectedOption) => {
    const fieldName = currentQuestion.field;
    const updatedAnswers = {
      ...answers,
      [fieldName]: selectedOption,
    };
    setAnswers(updatedAnswers);

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Step 5 completed -> submit to backend
      setIsLoading(true);
      setError("");
      try {
        const res = await checkEligibilityAPI(updatedAnswers);
        setResults(res);
        setIsSubmitted(true);
      } catch (err) {
        setError(err.message || "Failed to check eligibility");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setAnswers({
      category: "",
      ageGroup: "",
      income: "",
      state: "",
      occupation: "",
    });
    setIsSubmitted(false);
    setResults(null);
    setError("");
  };

  return {
    currentStep,
    currentQuestion,
    totalSteps: 5,
    answers,
    isSubmitted,
    isLoading,
    results,
    error,
    handleSelectOption,
    handlePrevious,
    resetFlow,
  };
};
