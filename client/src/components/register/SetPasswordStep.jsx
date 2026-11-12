import { FiEye, FiEyeOff } from "react-icons/fi";
import FormInput from "../auth/FormInput";

function SetPasswordStep({
  formData,
  errors,
  onChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-['Poppins'] text-base font-semibold text-[#242322]">Set Password</h2>

      <div>
        <FormInput
          id="password"
          label="Create Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          placeholder="Enter your password"
          autoComplete="new-password"
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
        <p className="mt-1 text-xs font-light text-[#938e8c]/80">Min. 8 characters</p>
      </div>

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
        placeholder="Re-enter Password"
        autoComplete="new-password"
        error={errors.confirmPassword}
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

      <label className="mt-1 flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={formData.agreedToTerms}
          onChange={(e) => onChange("agreedToTerms", e.target.checked)}
          className="mt-0.5 h-3 w-3 shrink-0 cursor-pointer accent-[#fd7a08]"
        />
        <span className="text-[11px] leading-snug text-[#938e8c]">
          I agree to the{" "}
          <button type="button" className="font-medium text-[#fd7a08] hover:text-[#e56d00] cursor-pointer">
            Terms of Use
          </button>{" "}
          and{" "}
          <button type="button" className="font-medium text-[#fd7a08] hover:text-[#e56d00] cursor-pointer">
            Privacy Policy
          </button>
        </span>
      </label>
      {errors.agreedToTerms && (
        <p className="text-xs text-red-500">{errors.agreedToTerms}</p>
      )}
    </div>
  );
}

export default SetPasswordStep;
