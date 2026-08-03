import "../config/env.js";
import connectDB from "../config/db.js";
import Scheme from "../models/Scheme.js";
import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fieldDescriptions = {
  eligibilitySummary: "detailed eligibility criteria including age, target groups, and eligibility rules",
  applicationModeSummary: "step-by-step application process and instructions on how to apply",
  documentsSummary: "comma-separated list of required documents to apply for this scheme",
  beneficiaries: "target beneficiaries description (who benefits from this scheme)",
  annualBenefit: "annual financial or non-financial benefits provided by this scheme",
};

async function enrichField(scheme, field) {
  const portalUrl = scheme.applicationUrl && scheme.applicationUrl !== "#" ? scheme.applicationUrl : scheme.pdfLink;
  const prompt = `Search the official government website ${portalUrl} and reliable government sources. Find the exact ${fieldDescriptions[field]} for the scheme '${scheme.title}'. Only return information you find from real sources — if you cannot find reliable information, respond with exactly 'NOT_FOUND'. Return only the fact, no extra commentary.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Use gemini-2.0-flash with new key
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const responseText = response.text?.trim() || "";
    if (!responseText || responseText === "NOT_FOUND" || responseText.toUpperCase().includes("NOT_FOUND")) {
      return null;
    }
    return responseText;
  } catch (err) {
    console.error(`[API ERROR] Failed to fetch '${field}' for '${scheme.title}':`, err.message);
    return null;
  }
}

async function run() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY environment variable is not defined inside Server/.env");
    process.exit(1);
  }

  await connectDB();
  console.log("MongoDB connected");

  // Fetch ONLY PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) for testing
  const scheme = await Scheme.findOne({ title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)" });
  if (!scheme) {
    console.log("PM-KISAN scheme not found in database.");
    process.exit(0);
  }

  const schemes = [scheme];
  console.log(`Found ${schemes.length} imported schemes to audit.`);

  for (const scheme of schemes) {
    console.log(`Auditing scheme: "${scheme.title}"...`);
    const missingFields = [];
    
    // Check missing / thin fields
    if (!scheme.eligibilitySummary || scheme.eligibilitySummary.length < 10) missingFields.push("eligibilitySummary");
    if (!scheme.applicationModeSummary || scheme.applicationModeSummary.length < 10) missingFields.push("applicationModeSummary");
    if (!scheme.documentsSummary || scheme.documentsSummary.length < 10) missingFields.push("documentsSummary");
    if (!scheme.beneficiaries || scheme.beneficiaries.length < 5) missingFields.push("beneficiaries");
    if (!scheme.annualBenefit || scheme.annualBenefit.length < 5) missingFields.push("annualBenefit");

    if (missingFields.length === 0) {
      console.log(`-> Scheme "${scheme.title}" is already fully populated.`);
      continue;
    }

    console.log(`-> Found ${missingFields.length} missing/thin fields: ${missingFields.join(", ")}`);
    const updates = {};

    for (const field of missingFields) {
      console.log(`   * Requesting Google Search grounding for: "${field}"`);
      const enrichedValue = await enrichField(scheme, field);
      
      if (enrichedValue) {
        updates[field] = enrichedValue;
        console.log(`     [SUCCESS] Enriched value retrieved.`);
      } else {
        console.log(`     [SKIPPED] Response was empty or NOT_FOUND.`);
      }

      // 1.5-second delay to respect rate limit caps
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    if (Object.keys(updates).length > 0) {
      Object.assign(scheme, updates);
      await scheme.save();
      console.log(`-> Saved updates for scheme: "${scheme.title}"`);
    } else {
      console.log(`-> No fields updated for scheme: "${scheme.title}"`);
    }
    console.log("--------------------------------------------------");
  }

  console.log("Enrichment run complete.");
  mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("Enrichment process failed:", err);
  process.exit(1);
});
