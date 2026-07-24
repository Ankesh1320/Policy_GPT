import express from "express";
import { checkEligibility, getAllSchemes, seedSchemes } from "../controllers/eligibilityController.js";

const router = express.Router();

router.post("/check", checkEligibility);
router.get("/schemes", getAllSchemes);
router.post("/seed", seedSchemes);

export default router;
