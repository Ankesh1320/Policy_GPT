import { Link } from "react-router-dom";
import { HiOutlineKey } from "react-icons/hi2";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import FormInput from "../components/auth/FormInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import { useForgotPassword } from "../hooks/useForgotPassword";

function ForgotPasswordPage() {
  const {
    identifier,
    handleIdentifierChange,
    error,
    isLoading,
    handleSubmit,
    isValid,
  } = useForgotPassword();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f3da] px-4 py-10">
      <AuthCard>
        <AuthHeader
          title="Forgot Password"
          description="Enter your registered email or 10-digit mobile number to verify your identity."
          icon={HiOutlineKey}
        />

        <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col" noValidate>
          <div className="mb-6">
            <FormInput
              id="identifier"
              label="Email or Mobile Number"
              value={identifier}
              onChange={handleIdentifierChange}
              placeholder="e.g. you@example.com or 9876543210"
              autoComplete="username"
              error={error}
            />
          </div>

          <div className="flex flex-col gap-3">
            <PrimaryButton type="submit" isLoading={isLoading} disabled={!isValid} loadingText="Sending OTP...">
              Send OTP
            </PrimaryButton>

            <Link
              to="/citizen/login"
              className="flex h-[42px] w-full items-center justify-center rounded-[15px] border border-[#938e8c] bg-white text-sm font-semibold text-[#242322] transition-all duration-200 hover:border-[#fd7a08] hover:bg-[#fff8de] cursor-pointer"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}

export default ForgotPasswordPage;
