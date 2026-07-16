import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isMobile = (value) => /^[6-9]\d{9}$/.test(value);

export const useForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleIdentifierChange = (e) => {
    const val = e.target.value;
    setIdentifier(val);
    if (error) {
      setError("");
    }
  };

  const validate = () => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Email or mobile number is required");
      return false;
    }
    if (!isEmail(trimmed) && !isMobile(trimmed)) {
      setError("Enter a valid email or 10-digit mobile number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await forgotPassword(identifier);
      navigate("/verify-otp", { state: { identifier: identifier.trim() } });
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = !!(identifier.trim() && (isEmail(identifier.trim()) || isMobile(identifier.trim())));

  return {
    identifier,
    handleIdentifierChange,
    error,
    isLoading,
    handleSubmit,
    isValid,
  };
};
