/**
 * Fix volunteer password — resets without double-hashing
 * Run: node server/scripts/fixVolunteerPassword.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const VOLUNTEER_EMAIL = "volunteer@policygpt.in";
const VOLUNTEER_PASSWORD = "Volunteer@123";
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) { console.error("❌  MONGO_URI not found"); process.exit(1); }

async function fix() {
  await mongoose.connect(MONGO_URI);
  console.log("✅  Connected to MongoDB");

  const { default: User } = await import("../models/User.js");

  let user = await User.findOne({ email: VOLUNTEER_EMAIL }).select("+password");

  if (user) {
    // Just update the password — the pre-save hook will hash it exactly once
    user.password = VOLUNTEER_PASSWORD;
    user.role = "volunteer";
    await user.save();
    console.log("✅  Volunteer password fixed successfully!");
  } else {
    // Create fresh — pre-save hook will hash the plain password
    await User.create({
      email: VOLUNTEER_EMAIL,
      password: VOLUNTEER_PASSWORD,   // plain text — model hashes it
      fullName: "Volunteer Reviewer",
      role: "volunteer",
    });
    console.log("✅  Volunteer user created fresh!");
  }

  console.log(`    Email:    ${VOLUNTEER_EMAIL}`);
  console.log(`    Password: ${VOLUNTEER_PASSWORD}`);
  await mongoose.disconnect();
  console.log("🔌  Done");
}

fix().catch((e) => { console.error(e); process.exit(1); });
