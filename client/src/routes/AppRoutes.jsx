import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CitizenLoginPage from "../pages/CitizenLoginPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import CitizenRegisterPage from "../pages/CitizenRegisterPage";
import AdminRegisterPage from "../pages/AdminRegisterPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/citizen/login" element={<CitizenLoginPage />} />
        <Route path="/citizen/register" element={<CitizenRegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/login" element={<Navigate to="/citizen/login" replace />} />
        <Route path="/" element={<Navigate to="/citizen/login" replace />} />
        <Route path="*" element={<Navigate to="/citizen/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
