import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CitizenLoginPage from "../pages/CitizenLoginPage";
import AdminLoginPage from "../pages/AdminLoginPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/citizen/login" element={<CitizenLoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/login" element={<Navigate to="/citizen/login" replace />} />
        <Route path="/" element={<Navigate to="/citizen/login" replace />} />
        <Route path="*" element={<Navigate to="/citizen/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
