import { useState, useEffect } from "react";
import { questionsData, checkEligibilityAPI } from "../services/eligibilityService";

export const useEligibilityFlow = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = sessionStorage.getItem("elig_currentStep");
    return saved ? Number(saved) : 1;
  });

  const [answers, setAnswers] = useState(() => {
    const saved = sessionStorage.getItem("elig_answers");
    return saved ? JSON.parse(saved) : {
      category: "",
      ageGroup: "",
      income: "",
      state: "",
      occupation: "",
    };
  });

  const [isSubmitted, setIsSubmitted] = useState(() => {
    const saved = sessionStorage.getItem("elig_isSubmitted");
    return saved ? JSON.parse(saved) : false;
  });

  const [results, setResults] = useState(() => {
    const saved = sessionStorage.getItem("elig_results");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("elig_currentStep", currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    sessionStorage.setItem("elig_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    sessionStorage.setItem("elig_isSubmitted", JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  useEffect(() => {
    if (results) {
      sessionStorage.setItem("elig_results", JSON.stringify(results));
    } else {
      sessionStorage.removeItem("elig_results");
    }
  }, [results]);

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
    sessionStorage.removeItem("elig_currentStep");
    sessionStorage.removeItem("elig_answers");
    sessionStorage.removeItem("elig_isSubmitted");
    sessionStorage.removeItem("elig_results");
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
