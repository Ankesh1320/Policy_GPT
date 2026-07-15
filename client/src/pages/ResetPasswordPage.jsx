import { Link } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiCheck, FiX } from "react-icons/fi";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import FormInput from "../components/auth/FormInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import { useResetPassword } from "../hooks/useResetPassword";

function ResetPasswordPage() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    isLoading,
    checks,
    isMatching,
    handleSubmit,
    isValid,
  } = useResetPassword();

  const requirements = [
    { label: "Minimum 8 characters", checked: checks.minLength },
    { label: "At least one uppercase letter (A-Z)", checked: checks.uppercase },
    { label: "At least one lowercase letter (a-z)", checked: checks.lowercase },
    { label: "At least one number (0-9)", checked: checks.number },
    { label: "At least one special character (!@#...)", checked: checks.specialChar },
    { label: "Passwords match", checked: isMatching },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f3da] px-4 py-10">
      <AuthCard>
        <AuthHeader
          title="Reset Password"
          description="Create a new secure password for your PolicyGPT account."
          icon={HiOutlineLockClosed}
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

          <div className="mb-4">
            <FormInput
              id="password"
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              autoComplete="new-password"
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-[#938e8c] transition-colors duration-200 hover:text-[#fd7a08] cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              }
            />
          </div>

          <div className="mb-4">
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              autoComplete="new-password"
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="text-[#938e8c] transition-colors duration-200 hover:text-[#fd7a08] cursor-pointer"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              }
            />
          </div>

          {/* Password Requirements Checklist */}
          <div className="mb-6 rounded-xl border border-[#ffcd73]/30 bg-[#fff8de]/40 p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#797875]">
              Password Requirements
            </h3>
            <ul className="space-y-1.5">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-xs font-medium">
                  {req.checked ? (
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#08e02f]/15 text-[#08e02f]">
                      <FiCheck size={12} className="stroke-[3]" />
                    </span>
                  ) : (
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-50 text-red-400">
                      <FiX size={12} className="stroke-[3]" />
                    </span>
                  )}
                  <span
                    className={
                      req.checked
                        ? "text-emerald-700 font-semibold transition-colors duration-200"
                        : "text-[#938e8c] transition-colors duration-200"
                    }
                  >
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <PrimaryButton type="submit" isLoading={isLoading} disabled={!isValid} loadingText="Resetting...">
              Reset Password
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

export default ResetPasswordPage;
