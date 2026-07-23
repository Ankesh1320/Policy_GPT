import express from "express";
import { compareSchemes, getAllCompareSchemes } from "../controllers/compareController.js";

const router = express.Router();

router.get("/all", getAllCompareSchemes);
router.get("/", compareSchemes);
router.post("/", compareSchemes);

export default router;
