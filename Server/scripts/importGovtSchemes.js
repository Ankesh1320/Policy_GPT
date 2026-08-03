import "../config/env.js";
import connectDB from "../config/db.js";
import Scheme from "../models/Scheme.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/government_schemes_dataset.json"), "utf-8")
);

function toArray(str) {
  if (!str) return [];
  return str
    .split(/,|\. (?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function mapCategory(cat) {
  if (!cat) return "Financial Aid";
  const c = cat.toLowerCase();
  if (c.includes("agriculture") || c.includes("farming") || c.includes("rural development")) return "Agriculture";
  if (c.includes("health") || c.includes("insurance") || c.includes("medical")) return "Healthcare";
  if (c.includes("housing") || c.includes("shelter")) return "Housing";
  if (c.includes("education") || c.includes("scholarship")) return "Education";
  if (c.includes("women") || c.includes("child")) return "Women Welfare";
  if (c.includes("employment") || c.includes("skill") || c.includes("entrepreneurship") || c.includes("livelihood")) return "Employment";
  return "Financial Aid";
}

function transform(item) {
  const normalizedCategory = mapCategory(item.schemeCategory);

  return {
    title: item.schemeName,
    department: item.ministryDepartment,
    category: normalizedCategory,
    description: item.schemeDescription, // Map directly
    objective: item.objective, // Map directly
    publishedDate: "2024",
    pdfLink: item.applicationUrl,
    status: "Published",
    eligibilitySummary: item.eligibilityCriteria,
    applicationModeSummary: item.applicationProcess,
    documentsSummary: item.requiredDocuments,
    beneficiaries: item.beneficiaries || "Eligible citizens",
    annualBenefit: item.annualBenefit || "Specified financial/social benefits",
    helpline: item.helpline,
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      states: item.state?.includes("All India") ? ["All India"] : [item.state],
      occupations: ["Any"],
      incomeRanges: ["All"],
    },
    eligibility: {
      minAge: 0,
      maxAge: 100,
      genders: ["Any"],
      occupations: ["Any"],
      educationLevels: item.educationCriteria?.toLowerCase().includes("no education")
        ? ["Any"]
        : toArray(item.educationCriteria),
      annualIncomeMax: 0,
      states: item.state?.includes("All India") ? ["All India"] : [item.state],
      districts: ["All"],
      socialCategories: ["All"],
      disabilityRequired: false,
      minorityRequired: false,
      farmerRequired: item.schemeCategory?.toLowerCase().includes("agriculture") || false,
      studentRequired: item.schemeCategory?.toLowerCase().includes("education") || false,
      womenOnly: item.schemeCategory?.toLowerCase().includes("women") || false,
      requiredDocuments: toArray(item.requiredDocuments),
    },
    benefits: item.benefits ? [item.benefits] : [],
    documentsRequired: toArray(item.requiredDocuments),
    applicationUrl: item.applicationUrl,
    tags: [normalizedCategory, item.ministryDepartment].filter(Boolean),
  };
}

async function run() {
  await connectDB();
  console.log("MongoDB connected");

  // Delete previously imported schemes
  const cleanResult = await Scheme.deleteMany({ pdfLink: { $ne: "#" } });
  console.log(`Cleaned up ${cleanResult.deletedCount} previously imported schemes.`);

  const transformed = rawData.map(transform);

  let inserted = 0;
  let skipped = 0;

  for (const scheme of transformed) {
    const exists = await Scheme.findOne({ title: scheme.title });
    if (exists) {
      skipped++;
      continue;
    }
    await Scheme.create(scheme);
    inserted++;
  }

  console.log(`Done. Inserted: ${inserted}, Skipped (already existed): ${skipped}`);
  process.exit();
}

run().catch((err) => {
  console.error("Error importing schemes:", err);
  process.exit(1);
});
