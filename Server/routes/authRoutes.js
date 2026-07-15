import express from "express";
import { getMe, loginAdmin, loginCitizen, registerCitizen, registerAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/citizen/register", registerCitizen);
router.post("/citizen/login", loginCitizen);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/me", protect, getMe);

export default router;
