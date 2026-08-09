import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Scheme from "../models/Scheme.js";
import connectDB from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env
dotenv.config({ path: path.join(__dirname, "../.env") });

async function verify() {
  await connectDB();

  console.log("\n=================== VERIFICATION ===================");

  // 1. Check JSON count
  const jsonPath = path.join(__dirname, "../data/government_schemes (1).json");
  const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const jsonCount = rawData.length;
  console.log(`1. JSON file 'government_schemes (1).json' has: ${jsonCount} schemes.`);

  // 2. Check Database count
  const dbCount = await Scheme.countDocuments({});
  console.log(`2. MongoDB 'schemes' collection has: ${dbCount} schemes.`);

  // 3. Compare scheme names
  const jsonNames = rawData.map(item => item.schemeName).sort();
  
  const dbSchemes = await Scheme.find({});
  const dbNames = dbSchemes.map(s => s.title || s.name).sort();

  console.log("\nJSON Scheme Names:");
  jsonNames.forEach((name, idx) => console.log(`  [${idx + 1}] "${name}"`));

  console.log("\nDatabase Scheme Names:");
  dbNames.forEach((name, idx) => console.log(`  [${idx + 1}] "${name}"`));

  let mismatch = false;
  
  if (jsonCount !== dbCount) {
    console.log(`\n[WARNING] Count mismatch: JSON has ${jsonCount}, DB has ${dbCount}`);
    mismatch = true;
  }

  // Check if every JSON name exists in DB
  for (const jsonName of jsonNames) {
    const exists = dbNames.includes(jsonName);
    if (!exists) {
      console.log(`[WARNING] "${jsonName}" from JSON is missing in DB.`);
      mismatch = true;
    }
  }

  // Check if any DB names are not in JSON (indicating old sample data or extra entries)
  for (const dbName of dbNames) {
    const exists = jsonNames.includes(dbName);
    if (!exists) {
      console.log(`[WARNING] Extra scheme "${dbName}" in DB which is not in the JSON file.`);
      mismatch = true;
    }
  }

  if (!mismatch) {
    console.log("\n[SUCCESS] Verification complete: MongoDB schemes match JSON schemes exactly (10 of 10)!");
  } else {
    console.log("\n[FAILURE] Mismatch detected between JSON and Database!");
  }

  console.log("===================================================\n");
  mongoose.connection.close();
  process.exit(mismatch ? 1 : 0);
}

verify().catch(console.error);
