import express from "express";
import { getMe, loginAdmin, loginCitizen, registerCitizen, registerAdmin, forgotPassword, verifyOtp, resendOtp, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/citizen/register", registerCitizen);
router.post("/citizen/login", loginCitizen);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);

export default router;
