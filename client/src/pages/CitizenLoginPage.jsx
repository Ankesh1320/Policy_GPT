import { useNavigate, useLocation } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLoginForm from "../components/auth/AuthLoginForm";
import { useLogin } from "../hooks/useLogin";

function CitizenLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginState = useLogin("citizen");

  const handleRoleChange = (role) => {
    if (role === "admin") {
      navigate("/admin/login");
    }
  };

  const handleSubmit = async (event) => {
    const result = await loginState.handleSubmit(event);
    if (result) {
      console.log("Citizen login successful", result.user);
      const userRole = result.user?.role || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))?.role : "citizen");
      if (userRole === "citizen") {
        navigate("/citizen/dashboard");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f3da] px-4 py-10">
      <AuthCard>
        {location.state?.passwordResetSuccess && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-[#08e02f]/20 bg-[#08e02f]/10 px-4 py-3 text-sm text-emerald-700 font-medium transition-opacity duration-200"
          >
            🎉 Password reset successful! Please sign in.
          </div>
        )}
        <AuthLoginForm
          {...loginState}
          setRole={handleRoleChange}
          onSubmit={handleSubmit}
        />
      </AuthCard>
    </div>
  );
}

export default CitizenLoginPage;
