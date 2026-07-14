import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLoginForm from "../components/auth/AuthLoginForm";
import { useLogin } from "../hooks/useLogin";

function CitizenLoginPage() {
  const navigate = useNavigate();
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
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f3da] px-4 py-10">
      <AuthCard>
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
