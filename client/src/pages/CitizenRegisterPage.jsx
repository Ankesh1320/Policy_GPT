import { Link } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import RegisterHeader from "../components/register/RegisterHeader";
import RegisterStepper from "../components/register/RegisterStepper";
import PersonalDetailsStep from "../components/register/PersonalDetailsStep";
import YourProfileStep from "../components/register/YourProfileStep";
import SetPasswordStep from "../components/register/SetPasswordStep";
import ContinueButton from "../components/register/ContinueButton";
import BackButton from "../components/register/BackButton";
import RegisterFooter from "../components/register/RegisterFooter";
import { useRegister } from "../hooks/useRegister";

function CitizenRegisterPage() {
  const {
    step,
    formData,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    isComplete,
    updateField,
    goToNextStep,
    goToPreviousStep,
    handleSubmit,
  } = useRegister("citizen");

  const handleContinue = (event) => {
    event.preventDefault();
    goToNextStep();
  };

  if (isComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9f3da] px-4 py-10">
        <AuthCard>
          <RegisterHeader role="citizen" />
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#08e02f]/15 text-3xl">
              🎉
            </div>
            <h2 className="font-['Poppins'] text-xl font-bold text-[#242322]">Account Created!</h2>
            <p className="mt-2 text-sm font-medium text-[#797875]">
              Welcome to PolicyGPT, {formData.fullName.split(" ")[0]}!
            </p>
            <Link
              to="/citizen/login"
              className="mt-6 flex h-[42px] w-full items-center justify-center rounded-[16px] bg-[#ffcd73] text-sm font-medium text-[#242322] transition-all duration-200 hover:bg-[#f5c066] hover:shadow-md active:scale-[0.98]"
            >
              Sign in to your account
            </Link>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f3da] px-4 py-10">
      <AuthCard>
        <RegisterHeader role="citizen" />
        <RegisterStepper currentStep={step} />

        <form
          onSubmit={step === 3 ? handleSubmit : handleContinue}
          className="flex w-full flex-col"
          noValidate
        >
          {errors.apiError && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium transition-opacity duration-200"
            >
              {errors.apiError}
            </div>
          )}
          {step === 1 && (
            <PersonalDetailsStep
              formData={formData}
              errors={errors}
              onChange={updateField}
            />
          )}

          {step === 2 && (
            <YourProfileStep
              formData={formData}
              errors={errors}
              onChange={updateField}
              role="citizen"
            />
          )}

          {step === 3 && (
            <SetPasswordStep
              formData={formData}
              errors={errors}
              onChange={updateField}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
          )}

          <div className={`mt-6 flex gap-3 ${step === 1 ? "flex-col" : "flex-row"}`}>
            {step > 1 && (
              <BackButton onClick={goToPreviousStep} disabled={isLoading} />
            )}

            {step < 3 ? (
              <ContinueButton
                type="submit"
                fullWidth={step === 1}
              />
            ) : (
              <ContinueButton
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Create Account 🎉
              </ContinueButton>
            )}
          </div>

          <RegisterFooter role="citizen" />
        </form>
      </AuthCard>
    </div>
  );
}

export default CitizenRegisterPage;
