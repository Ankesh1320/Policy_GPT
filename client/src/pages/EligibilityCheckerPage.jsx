import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import EligibilityHeader from "../components/eligibility/EligibilityHeader";
import ProgressBar from "../components/eligibility/ProgressBar";
import QuestionCard from "../components/eligibility/QuestionCard";
import { useEligibilityFlow } from "../hooks/useEligibilityFlow";
import EligibilityResults from "../components/eligibility/EligibilityResults";
import Sidebar from "../components/navbar/sidebar";
import DashboardNavbar from "../components/navbar/navbar";
import AuthBlocker from "../components/auth/AuthBlocker";

export default function EligibilityCheckerPage() {
  const {
    currentStep,
    currentQuestion,
    totalSteps,
    answers,
    isSubmitted,
    isLoading,
    results,
    error,
    handleSelectOption,
    handlePrevious,
    resetFlow,
  } = useEligibilityFlow();

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const token = localStorage.getItem("token");

  const selectedAnswerForCurrentStep = currentQuestion
    ? answers[currentQuestion.field]
    : "";

  if (token) {
    return (
      <div className="h-screen flex overflow-hidden bg-[#FDF9F2] font-body">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardNavbar
            onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          />
          <main className="flex-1 min-w-0 overflow-y-auto px-8 py-8 flex flex-col gap-6">
            <EligibilityHeader />
            
            <div className="w-full max-w-[1200px] mx-auto bg-cream p-6 rounded-[24px]">
              {!isSubmitted ? (
                isLoading ? (
                  <div className="w-full max-w-[800px] mx-auto bg-white rounded-[28px] p-12 text-center shadow-card border border-border-warm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card-orange mb-6">
                      <svg className="w-8 h-8 text-brand-orange animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-slate-heading">
                      Evaluating Your Scheme Eligibility...
                    </h3>
                    <p className="mt-2 font-body text-base text-text-secondary">
                      Analyzing government databases for your selected profile criteria.
                    </p>
                  </div>
                ) : (
                  <div>
                    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                    <QuestionCard
                      questionData={currentQuestion}
                      currentStep={currentStep}
                      selectedAnswer={selectedAnswerForCurrentStep}
                      onSelectOption={handleSelectOption}
                      onPrevious={handlePrevious}
                    />
                    {error && (
                      <div className="max-w-[800px] mx-auto mt-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-body">
                        ⚠️ {error}
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="max-w-[1200px] mx-auto">
                  <EligibilityResults
                    results={results}
                    filteredSchemes={results?.schemes || []}
                    onEditCriteria={resetFlow}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-warm font-body flex flex-col justify-between">
      <div>
        {/* Top Navigation Bar */}
        <Navbar activeLabel="Eligibility Checker" />

        <div className="relative">
          <div className={!token ? "blur-[6px] pointer-events-none select-none" : ""}>
            {/* Header Section */}
            <EligibilityHeader />

            {/* Questionnaire Section with Cream Background */}
            <main className="bg-cream py-10 px-5 lg:px-20 min-h-[600px] flex items-center justify-center">
              <div className="w-full max-w-[1440px] mx-auto">
                {!isSubmitted ? (
                  isLoading ? (
                    /* Loading State after Question 5 */
                    <div className="w-full max-w-[800px] mx-auto bg-white rounded-[28px] p-12 text-center shadow-card border border-border-warm">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card-orange mb-6">
                        <svg className="w-8 h-8 text-brand-orange animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-slate-heading">
                        Evaluating Your Scheme Eligibility...
                      </h3>
                      <p className="mt-2 font-body text-base text-text-secondary">
                        Analyzing government databases for your selected profile criteria.
                      </p>
                    </div>
                  ) : (
                    /* Question Form View */
                    <div>
                      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

                      <QuestionCard
                        questionData={currentQuestion}
                        currentStep={currentStep}
                        selectedAnswer={selectedAnswerForCurrentStep}
                        onSelectOption={handleSelectOption}
                        onPrevious={handlePrevious}
                      />

                      {error && (
                        <div className="max-w-[800px] mx-auto mt-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-body">
                          ⚠️ {error}
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  /* Results View after submission */
                  <div className="max-w-[1200px] mx-auto">
                    <EligibilityResults
                      results={results}
                      filteredSchemes={results?.schemes || []}
                      onEditCriteria={resetFlow}
                    />
                  </div>
                )}
              </div>
            </main>
          </div>

          {!token && <AuthBlocker pageName="Eligibility Checker" />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
