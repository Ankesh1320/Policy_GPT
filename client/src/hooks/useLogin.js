import { useState } from "react";
import { loginUser } from "../services/authService";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isMobile = (value) => /^[6-9]\d{9}$/.test(value);

const validateForm = ({ identifier, password, role }) => {
  const errors = {};
  const trimmedIdentifier = identifier.trim();

  if (!trimmedIdentifier) {
    errors.identifier =
      role === "admin" ? "Official email is required" : "Email or mobile number is required";
  } else if (role === "admin") {
    if (!isEmail(trimmedIdentifier)) {
      errors.identifier = "Enter a valid official email address";
    }
  } else if (!isEmail(trimmedIdentifier) && !isMobile(trimmedIdentifier)) {
    errors.identifier = "Enter a valid email or 10-digit mobile number";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const useLogin = (defaultRole = "citizen") => {
  const [role, setRole] = useState(defaultRole);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");

    const validationErrors = validateForm({ identifier, password, role });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);

    try {
      // Fake Admin Login Bypass
      if (identifier.trim().toLowerCase() === 'admin@admin.com' && password === 'password123') {
        const fakeData = {
          token: "fake-jwt-token-123",
          user: { id: "admin_123", email: "admin@admin.com", role: "admin", fullName: "System Admin" }
        };
        localStorage.setItem("token", fakeData.token);
        localStorage.setItem("user", JSON.stringify(fakeData.user));
        return fakeData;
      }

      const data = await loginUser({ identifier: identifier.trim(), password, role });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      setApiError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    handleSubmit,
  };
};
