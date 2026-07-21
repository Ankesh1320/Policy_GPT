import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import RoleToggle from "./RoleToggle";
import FormInput from "./FormInput";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import AuthDivider from "./AuthDivider";

function AuthLoginForm({
  role,
  setRole,
  identifier,
  setIdentifier,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  errors,
  apiError,
  isLoading,
  onSubmit,
}) {
  const isAdmin = role === "admin";
  const identifierLabel = isAdmin ? "Official Email" : "Email or Mobile Number";

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col" noValidate>
      <AuthHeader />

      <div className="mb-6">
        <RoleToggle role={role} onChange={setRole} />
      </div>

      {apiError && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 transition-opacity duration-200"
        >
          {apiError}
        </div>
      )}

      <div className="mb-4">
        <FormInput
          id="identifier"
          label={identifierLabel}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="you@example.com"
          autoComplete="username"
          error={errors.identifier}
        />
      </div>

      <div className="mb-2">
        <FormInput
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password}
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

      <div className="mb-5 flex justify-end">
        <Link
          to="/forgot-password"
          className="text-xs font-medium text-[#fd7a08] transition-colors duration-200 hover:text-[#e56d00] cursor-pointer"
        >
          Forgot password ?
        </Link>
      </div>

      <PrimaryButton type="submit" isLoading={isLoading}>
        Sign in
      </PrimaryButton>

      <AuthDivider />

      <SecondaryButton>Sign in with Digilocker / Aadhar</SecondaryButton>

      <p className="mt-6 text-center text-sm font-medium text-[#797875]">
        Don&apos;t have an account?{" "}
        <Link
          to={role === "admin" ? "/admin/register" : "/citizen/register"}
          className="font-bold text-[#fd7a08] transition-colors duration-200 hover:text-[#e56d00]"
        >
          Register
        </Link>
      </p>
    </form>
  );
}

export default AuthLoginForm;
