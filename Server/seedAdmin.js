import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Remove old test admins
    await User.deleteOne({ email: "admin@admin.com" });

    // Create fake admin
    const adminUser = new User({
      fullName: "System Admin",
      email: "admin@admin.com",
      mobile: "9999999999",
      password: "password123",
      state: "Admin State",
      role: "admin",
    });

    await adminUser.save();
    console.log("SUCCESS! Fake admin account created.");
    console.log("Email: admin@admin.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Error creating fake admin:", error);
    process.exit(1);
  }
};

seedAdmin();
