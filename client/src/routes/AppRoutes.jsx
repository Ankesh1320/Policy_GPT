import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import CitizenLoginPage from "../pages/CitizenLoginPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import CitizenRegisterPage from "../pages/CitizenRegisterPage";
import AdminRegisterPage from "../pages/AdminRegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import LandingPage from "../pages/LandingPage";
import PoliciesPage from "../pages/PoliciesPage";
import PolicyDetailsPage from "../pages/PolicyDetailsPage";
import SchemeDetailsPage from "../pages/SchemeDetailsPage";
import SchemesPage from "../pages/SchemesPage";
import CitizenDashboard from "../pages/CitizenDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import SchemeManagement from "../pages/admin/SchemeManagement";
import PolicyManagement from "../pages/admin/PolicyManagement";
import ContactUsPage from "../pages/ContactUsPage";
import EligibilityCheckerPage from "../pages/EligibilityCheckerPage";
import CompareSchemesPage from "../pages/CompareSchemesPage";
import AboutUsPage from "../pages/AboutUsPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/citizen/login" element={<CitizenLoginPage />} />
        <Route path="/citizen/register" element={<CitizenRegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/login" element={<Navigate to="/citizen/login" replace />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/schemes" element={<SchemesPage />} />
        <Route path="/schemes/:id" element={<SchemeDetailsPage />} />
        <Route path="/policies" element={<PoliciesPage />} />
        <Route path="/policies/:id" element={<PolicyDetailsPage />} />
        <Route path="/eligibility-checker" element={<EligibilityCheckerPage />} />
        <Route path="/compare" element={<CompareSchemesPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route
          path="/citizen/dashboard"
          element={
            <ProtectedRoute redirectTo="/citizen/login">
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute redirectTo="/admin/login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/scheme-management"
          element={
            <ProtectedRoute redirectTo="/admin/login">
              <SchemeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/policy-management"
          element={
            <ProtectedRoute redirectTo="/admin/login">
              <PolicyManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
