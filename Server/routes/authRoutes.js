import express from "express";
import { getMe, loginAdmin, loginCitizen } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/citizen/login", loginCitizen);
router.post("/admin/login", loginAdmin);
router.get("/me", protect, getMe);

export default router;
