import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import { Notification } from "../models/Notification.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({});
    console.log(`Found ${users.length} users in database.`);

    const now = Date.now();
    let count = 0;

    for (const user of users) {
      // Check if this user already has notifications to avoid duplicate insertions
      const existing = await Notification.findOne({ user: user._id });
      if (existing) {
        console.log(`User ${user.email || user.mobile || user.fullName} already has notifications. Skipping.`);
        continue;
      }

      await Notification.insertMany([
        {
          user: user._id,
          title: "PM Kisan 17th installment released",
          role: "citizen",
          isRead: false,
          createdAt: new Date(now - 2 * 60 * 60 * 1000)
        },
        {
          user: user._id,
          title: "Scholarship deadline in 5 days",
          role: "citizen",
          isRead: false,
          createdAt: new Date(now - 24 * 60 * 60 * 1000)
        },
        {
          user: user._id,
          title: "New scheme added: MUDRA Tarun",
          role: "citizen",
          isRead: true,
          createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000)
        }
      ]);

      console.log(`Seeded 3 notifications for user: ${user.email || user.mobile || user.fullName}`);
      count += 3;
    }

    console.log(`\nSuccessfully seeded ${count} citizen notifications in total.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
