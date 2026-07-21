const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const loginUser = async ({ identifier, password, role }) => {
  const endpoint =
    role === "admin" ? "/auth/admin/login" : "/auth/citizen/login";

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const registerUser = async (userData, role) => {
  const endpoint =
    role === "admin" ? "/auth/admin/register" : "/auth/citizen/register";

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const forgotPassword = async (input) => {
  const identifierValue = typeof input === "object" && input !== null ? (input.identifier || input.email || "") : String(input || "");
  const payload = { identifier: identifierValue.trim() };

  console.log("Forgot password payload:", payload);

  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to request verification code");
  }

  return data;
};

export const verifyOtp = async (identifier, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Verification code is incorrect");
  }

  return data;
};

export const resendOtp = async (identifier) => {
  const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to resend verification code");
  }

  return data;
};

export const resetPassword = async (identifier, otp, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, otp, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
};
