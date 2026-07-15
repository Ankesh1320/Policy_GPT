import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../services/authService";

export const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier || "";
  const otp = location.state?.otp || "";

  // Password requirement regex checks
  const checks = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>_+\-\[\]\\\/]/.test(password),
  };

  const isPasswordValid = Object.values(checks).every(Boolean);
  const isMatching = password && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements.");
      return;
    }
    if (!isMatching) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await resetPassword(identifier, otp, password);
      // Navigate to login with success alert state
      navigate("/citizen/login", { state: { passwordResetSuccess: true } });
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = !!(isPasswordValid && isMatching);

  return {
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
    identifier,
  };
};
