import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Policy from "../models/Policy.js";
import connectDB from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env
dotenv.config({ path: path.join(__dirname, "../.env") });

async function verify() {
  await connectDB();

  console.log("\n=================== INTEGRATION VERIFICATION ===================");

  // 1. Fetch all policies
  const dbPolicies = await Policy.find({}).sort({ name: 1 });
  console.log(`1. Total policies in database: ${dbPolicies.length}`);
  
  if (dbPolicies.length !== 10) {
    console.log(`[FAILURE] Expected 10 policies, found ${dbPolicies.length}`);
    process.exit(1);
  }
  console.log("[SUCCESS] Database contains exactly 10 policies.");

  // 2. Validate fields and mapping for each policy
  console.log("\nPolicy Field Checks:");
  for (const policy of dbPolicies) {
    console.log(`- Policy: "${policy.name}"`);
    console.log(`  * title: "${policy.title}"`);
    console.log(`  * department: "${policy.department}"`);
    console.log(`  * category: "${policy.category}"`);
    console.log(`  * published: "${policy.published}"`);
    console.log(`  * status: "${policy.status}"`);
    console.log(`  * pdf: "${policy.pdf}"`);
    console.log(`  * eligibility count: ${policy.eligibility ? policy.eligibility.length : 0}`);
    console.log(`  * description length: ${policy.description ? policy.description.length : 0} chars`);

    // Verify critical fields exist
    if (!policy.name || !policy.title || !policy.department || !policy.category || !policy.published || !policy.description || !policy.eligibility || policy.eligibility.length === 0) {
      console.log(`[FAILURE] Missing critical fields in policy "${policy.name}"`);
      process.exit(1);
    }
  }
  console.log("[SUCCESS] All policies have complete, valid fields.");

  // 3. Verify PolicyGPT/search logic
  console.log("\nSearch/PolicyGPT Test Queries:");
  const testQueries = [
    { term: "steel", expected: "National Steel Policy 2017" },
    { term: "water policy", expected: "National Water Policy 2012" },
    { term: "education", expected: "National Education Policy 2020" }
  ];

  for (const q of testQueries) {
    const match = await Policy.findOne({
      $or: [
        { name: { $regex: q.term, $options: "i" } },
        { description: { $regex: q.term, $options: "i" } }
      ]
    });

    if (!match) {
      console.log(`[FAILURE] Search query "${q.term}" returned no matches.`);
      process.exit(1);
    }

    console.log(`  * Query: "${q.term}" matched policy "${match.name}" (Expected: "${q.expected}")`);
    if (match.name !== q.expected) {
      console.log(`[FAILURE] Query mismatch: Expected "${q.expected}", got "${match.name}"`);
      process.exit(1);
    }
  }
  console.log("[SUCCESS] Search/PolicyGPT matching logic passed successfully!");

  console.log("===============================================================\n");
  mongoose.connection.close();
  process.exit(0);
}

verify().catch(console.error);
