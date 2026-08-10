import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Policy from "../models/Policy.js";
import connectDB from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const jsonPath = path.join(__dirname, "../data/policies.json");

// Helper to normalize names for robust comparison
function normalizeName(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

async function run() {
  await connectDB();
  console.log("MongoDB Connected.");

  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: Policy JSON file not found at path: ${jsonPath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log(`Loaded ${rawData.length} policy records from JSON.`);

  let inserted = 0;
  let skipped = 0;

  for (const item of rawData) {
    const normJsonName = normalizeName(item.name || item.title);

    // Fetch existing database policies to compare normalized names
    const allPolicies = await Policy.find({}).lean();
    const exists = allPolicies.some(
      (p) => normalizeName(p.name) === normJsonName || normalizeName(p.title) === normJsonName
    );

    if (exists) {
      console.log(`Skipped policy (already exists): "${item.name}"`);
      skipped++;
      continue;
    }

    // Map JSON fields to Policy Model
    const policyRecord = {
      name: item.name,
      title: item.title || item.name,
      department: item.department,
      category: item.category || "General",
      description: item.description,
      effectiveDate: item.effectiveDate,
      date: item.effectiveDate,
      published: item.effectiveDate,
      status: item.status || "Published",
      eligibility: item.eligibility || [],
      pdf: item.pdf || "#",
      icon: item.icon || "FileText",
      iconBg: "#faf5ff",
      iconColor: "#a855f7"
    };

    await Policy.create(policyRecord);
    console.log(`Imported policy: "${item.name}"`);
    inserted++;
  }

  console.log("\n--- POLICIES IMPORT SUMMARY ---");
  console.log(`Total JSON records: ${rawData.length}`);
  console.log(`Successfully inserted: ${inserted}`);
  console.log(`Skipped (duplicates): ${skipped}`);
  console.log("-------------------------------\n");

  await mongoose.connection.close();
  console.log("Database connection closed.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
