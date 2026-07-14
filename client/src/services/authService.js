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
