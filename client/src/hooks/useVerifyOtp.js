import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp, resendOtp } from "../services/authService";

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier || sessionStorage.getItem("reset_identifier") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleOtpChange = (index, value) => {
    // Allow only numeric digits
    const numericVal = value.replace(/\D/g, "");
    if (!numericVal) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    const digit = numericVal[numericVal.length - 1]; // get the last character entered
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input field
    if (index < 5 && digit) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If currently empty, focus previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        // If currently filled, clear it
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim().replace(/\D/g, "");
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      if (pastedData[i]) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    // Focus last filled input index or the 6th input box
    const focusIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setError("");
    setSuccessMessage("");
    try {
      await resendOtp(identifier);
      setSuccessMessage("OTP resent successfully!");
      setTimer(30);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }

    if (!identifier) {
      setError("Session expired. Please request OTP again.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await verifyOtp(identifier, code);
      sessionStorage.setItem("reset_otp", code);
      navigate("/reset-password", { state: { identifier, otp: code } });
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const setRef = (index, el) => {
    if (el) {
      inputRefs.current[index] = el;
    }
  };

  const isValid = otp.every((digit) => digit !== "");

  return {
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
  };
};
