import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Scheme from "../models/Scheme.js";
import connectDB from "../config/db.js";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const jsonPath = path.join(__dirname, "../data/government_schemes (1).json");

// Helper to normalize names for robust comparison
function normalizeName(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\\n/g, " ")
    .replace(/\n/g, " ")
    .replace(/\binback\b/gi, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

// Helper to convert comma-separated string to array
function toArray(str) {
  if (!str) return [];
  return str
    .split(/,|\. (?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Category mapper matching importGovtSchemes.js
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

// Transform for 'schemes' collection (matches Scheme.js mongoose model)
function transformForSchemes(item) {
  const normalizedCategory = mapCategory(item.schemeCategory);

  return {
    title: item.schemeName,
    department: item.ministryDepartment,
    category: normalizedCategory,
    description: item.schemeDescription,
    objective: item.objective,
    publishedDate: "2024",
    pdfLink: item.applicationUrl || "#",
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
    applicationUrl: item.applicationUrl || "#",
    tags: [normalizedCategory, item.ministryDepartment].filter(Boolean),
  };
}

// Transform for 'governmentschemes' raw collection
function transformForGovSchemes(item) {
  const contentHash = crypto.createHash("sha256").update(item.schemeName).digest("hex");
  return {
    structured: {
      schemeName: item.schemeName,
      schemeDescription: item.schemeDescription,
      objective: item.objective,
      ministryDepartment: item.ministryDepartment,
      state: item.state,
      eligibilityCriteria: item.eligibilityCriteria,
      ageCriteria: null,
      casteCategoryCriteria: null,
      genderCriteria: null,
      incomeCriteria: null,
      educationCriteria: item.educationCriteria,
      benefits: item.benefits,
      financialAssistance: null,
      applicationProcess: item.applicationProcess,
      applicationUrl: item.applicationUrl,
      requiredDocuments: toArray(item.requiredDocuments),
      importantDates: null,
      contactInformation: null,
      targetBeneficiaries: item.beneficiaries,
      helpline: item.helpline,
      officialWebsite: item.applicationUrl,
      implementingAgency: item.ministryDepartment,
      schemeCategory: item.schemeCategory
    },
    content: `${item.schemeName} ${item.schemeDescription} ${item.objective} ${item.ministryDepartment} ${item.state} ${item.eligibilityCriteria} ${item.benefits} ${item.applicationProcess}`,
    source: {
      fileName: "government_schemes (1).json",
      relativePath: "government_schemes (1).json",
      contentHash: contentHash
    }
  };
}

async function run() {
  await connectDB();
  console.log("MongoDB Connected.");

  const db = mongoose.connection.db;
  const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log(`Loaded ${rawData.length} corrected records from JSON.`);

  // Targets
  const schemesCol = db.collection("schemes");
  const govCol = db.collection("governmentschemes");

  let schemesDeleted = 0;
  let schemesInserted = 0;
  let govDeleted = 0;
  let govInserted = 0;
  for (const item of rawData) {
    const normJsonName = normalizeName(item.schemeName);

    // --- Process schemes collection (using Mongoose model for insertion, raw collection for deletion) ---
    const allSchemes = await schemesCol.find({}).toArray();
    const matchingSchemes = allSchemes.filter(
      (s) => normalizeName(s.title) === normJsonName || normalizeName(s.name) === normJsonName
    );

    if (matchingSchemes.length > 0) {
      const idsToDelete = matchingSchemes.map((s) => s._id);
      const delResult = await schemesCol.deleteMany({ _id: { $in: idsToDelete } });
      schemesDeleted += delResult.deletedCount;
    }

    const transformedScheme = transformForSchemes(item);
    await Scheme.create(transformedScheme);
    schemesInserted++;

    // --- Process governmentschemes collection ---
    const allGov = await govCol.find({}).toArray();
    const matchingGov = allGov.filter(
      (g) => normalizeName(g.structured?.schemeName) === normJsonName
    );

    if (matchingGov.length > 0) {
      const idsToDelete = matchingGov.map((g) => g._id);
      const delResult = await govCol.deleteMany({ _id: { $in: idsToDelete } });
      govDeleted += delResult.deletedCount;
    }

    const transformedGov = transformForGovSchemes(item);
    await govCol.insertOne(transformedGov);
    govInserted++;
  }

  console.log("\n--- MIGRATION RUN SUMMARY ---");
  console.log(`Collection 'schemes': Deleted ${schemesDeleted} records, Inserted ${schemesInserted} records.`);
  console.log(`Collection 'governmentschemes': Deleted ${govDeleted} records, Inserted ${govInserted} records.`);

  // Verify Results
  console.log("\n--- VERIFICATION OF REPLACED SCHEMES ---");
  for (const item of rawData) {
    const normJsonName = normalizeName(item.schemeName);

    const sDocs = await Scheme.find({
      $or: [
        { title: item.schemeName },
        { name: item.schemeName }
      ]
    }).lean();

    const gDocs = await govCol.find({
      "structured.schemeName": item.schemeName
    }).toArray();

    console.log(`\nScheme Name: "${item.schemeName}"`);
    console.log(`  Found in 'schemes': ${sDocs.length} record(s)`);
    sDocs.forEach(d => {
      console.log(`    - ID: ${d._id} (Type: ${typeof d._id})`);
      console.log(`      Title: "${d.title}"`);
      console.log(`      Name: "${d.name}"`);
      console.log(`      Department: "${d.department}"`);
      console.log(`      Category: "${d.category}"`);
      console.log(`      Color Theme: "${d.colorTheme}"`);
    });

    console.log(`  Found in 'governmentschemes': ${gDocs.length} record(s)`);
    gDocs.forEach(d => {
      console.log(`    - ID: ${d._id}`);
      console.log(`      schemeName: "${d.structured?.schemeName}"`);
      console.log(`      state: "${d.structured?.state}"`);
    });
  }

  console.log("\nMigration completed.");
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
