import "../config/env.js";
import connectDB from "../config/db.js";
import mongoose from "mongoose";
import User from "../models/User.js";

async function showAdmins() {
  await connectDB();
  
  const adminUsers = await User.find({ role: "admin" }).select("+password");
  if (adminUsers.length > 0) {
    console.log("------------------------------------------");
    console.log(`FOUND ${adminUsers.length} ADMIN ACCOUNTS IN DATABASE:`);
    console.log("------------------------------------------");
    adminUsers.forEach((adminUser, idx) => {
      console.log(`Admin #${idx + 1}:`);
      console.log(`  ID:        ${adminUser._id}`);
      console.log(`  Email:     ${adminUser.email}`);
      console.log(`  Full Name: ${adminUser.fullName}`);
      console.log(`  Role:      ${adminUser.role}`);
      console.log(`  Password:  [Bcrypt Hash: ${adminUser.password}]`);
      console.log("------------------------------------------");
    });
  } else {
    console.log("No Admin users found in the database.");
  }

  mongoose.connection.close();
}

showAdmins().catch(console.error);
