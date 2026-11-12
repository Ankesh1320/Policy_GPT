import Scheme from "../models/Scheme.js";
import { processEligibilityCheck, sampleSchemes } from "../services/eligibilityService.js";

export const checkEligibility = async (req, res) => {
  try {
    const userAnswers = req.body;
    console.log("[ELIGIBILITY CONTROLLER] Check request received:", userAnswers);

    const result = await processEligibilityCheck(userAnswers);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Eligibility check error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while evaluating eligibility",
    });
  }
};

export const getAllSchemes = async (req, res) => {
  try {
    let schemes = await Scheme.find().lean();
    if (!schemes || schemes.length === 0) {
      schemes = sampleSchemes;
    }
    return res.status(200).json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    console.error("Get schemes error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching schemes",
    });
  }
};

export const seedSchemes = async (req, res) => {
  try {
    await Scheme.deleteMany({});
    const created = await Scheme.insertMany(sampleSchemes);
    return res.status(201).json({
      success: true,
      message: "Schemes seeded successfully",
      count: created.length,
    });
  } catch (error) {
    console.error("Seed schemes error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while seeding schemes",
    });
  }
};
