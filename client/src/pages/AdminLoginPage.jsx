import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLoginForm from "../components/auth/AuthLoginForm";
import { useLogin } from "../hooks/useLogin";

function AdminLoginPage() {
  const navigate = useNavigate();
  const loginState = useLogin("admin");

  const handleRoleChange = (role) => {
    if (role === "citizen") {
      navigate("/citizen/login");
    }
  };

  const handleSubmit = async (event) => {
    const result = await loginState.handleSubmit(event);
    if (result) {
      console.log("Admin login successful", result.user);
      navigate("/admin/dashboard");
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

export default AdminLoginPage;
