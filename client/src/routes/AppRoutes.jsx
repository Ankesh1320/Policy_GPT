import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CitizenLoginPage from "../pages/CitizenLoginPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import CitizenRegisterPage from "../pages/CitizenRegisterPage";
import AdminRegisterPage from "../pages/AdminRegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/citizen/login" element={<CitizenLoginPage />} />
        <Route path="/citizen/register" element={<CitizenRegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/login" element={<Navigate to="/citizen/login" replace />} />
        <Route path="/" element={<Navigate to="/citizen/login" replace />} />
        <Route path="*" element={<Navigate to="/citizen/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
