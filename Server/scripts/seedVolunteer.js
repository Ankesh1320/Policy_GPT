/**
 * Seed script — creates the sample volunteer user
 * Run with: node server/scripts/seedVolunteer.js
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the server root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const VOLUNTEER_EMAIL = "volunteer@policygpt.in";
const VOLUNTEER_PASSWORD = "Volunteer@123";
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌  MONGO_URI not found in .env — aborting.");
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅  Connected to MongoDB");

    // Dynamically import the User model (ES module)
    const { default: User } = await import("../models/User.js");

    const existing = await User.findOne({ email: VOLUNTEER_EMAIL });
    if (existing) {
      if (existing.role === "volunteer") {
        console.log("ℹ️   Volunteer user already exists — no changes made.");
      } else {
        // Upgrade role to volunteer if the email exists with a different role
        existing.role = "volunteer";
        await existing.save();
        console.log(`✅  Upgraded existing user (${VOLUNTEER_EMAIL}) to volunteer role.`);
      }
      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(VOLUNTEER_PASSWORD, 12);

    await User.create({
      email: VOLUNTEER_EMAIL,
      password: VOLUNTEER_PASSWORD,   // plain text — pre-save hook hashes it exactly once
      fullName: "Volunteer Reviewer",
      role: "volunteer",
    });

    console.log("🎉  Volunteer user created successfully!");
    console.log(`    Email:    ${VOLUNTEER_EMAIL}`);
    console.log(`    Password: ${VOLUNTEER_PASSWORD}`);
  } catch (err) {
    console.error("❌  Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌  Disconnected from MongoDB");
  }
}

seed();
