import { Link } from "react-router-dom";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import PrimaryButton from "../components/auth/PrimaryButton";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

function VerifyOtpPage() {
  const {
    otp,
    identifier,
    error,
    successMessage,
    isLoading,
    timer,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    handleResendOtp,
    handleSubmit,
    setRef,
    isValid,
  } = useVerifyOtp();

  const formattedTimer = timer < 10 ? `0${timer}` : timer;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f3da] px-4 py-10">
      <AuthCard>
        <AuthHeader
          title="Verify OTP"
          description={`We sent a 6-digit verification code to ${identifier || "your email/mobile"}.`}
          icon={HiOutlineShieldCheck}
        />

        <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col" noValidate>
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium transition-opacity duration-200"
            >
              {error}
            </div>
          )}

          {successMessage && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-[#08e02f]/20 bg-[#08e02f]/10 px-4 py-3 text-sm text-emerald-700 font-medium transition-opacity duration-200"
            >
              {successMessage}
            </div>
          )}

          <div className="mb-6 flex justify-between gap-2 px-1">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => setRef(index, el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={handleOtpPaste}
                className="h-[42px] w-[42px] rounded-[10px] border-2 border-[#ffcd73] bg-[#fff8de] text-center text-lg font-bold text-[#242322] placeholder:text-[#938e8c]/76 outline-none transition-all duration-200 focus:border-[#fd7a08] focus:ring-2 focus:ring-[#ffcd73]/30"
              />
            ))}
          </div>

          <div className="mb-6 text-center text-sm font-medium text-[#797875]">
            {timer > 0 ? (
              <span>
                Resend OTP in <span className="font-bold text-[#fd7a08]">00:{formattedTimer}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="font-bold text-[#fd7a08] hover:text-[#e56d00] focus:outline-none cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <PrimaryButton type="submit" isLoading={isLoading} disabled={!isValid} loadingText="Verifying...">
              Verify OTP
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

export default VerifyOtpPage;
