import mongoose from "mongoose";
import dotenv from "dotenv";
import { Notification } from "../models/Notification.js";

dotenv.config();

const adminNotifications = [
  { title: "5 new citizen registrations today.", isRead: false },
  { title: 'Scheme "PM Kisan Samman Nidhi" was updated successfully.', isRead: false },
  { title: "3 new feedback submissions require review.", isRead: false },
  { title: 'Policy "National Education Policy 2020" has been published.', isRead: false },
  { title: "System maintenance scheduled for 5 June 2025, 02:00 AM.", isRead: false },
  { title: "Monthly analytics report is ready for download.", isRead: false },
  { title: "2 applications flagged for eligibility review.", isRead: false },
  { title: 'New admin user "Priya Sharma" has been added.', isRead: false },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Only insert notifications that don't already exist (matched by title)
    const now = Date.now();
    let insertedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < adminNotifications.length; i++) {
      const n = adminNotifications[i];
      const exists = await Notification.findOne({ role: "admin", title: n.title });
      if (exists) {
        console.log(`  Skipped (already exists): "${n.title}"`);
        skippedCount++;
      } else {
        await Notification.create({
          ...n,
          role: "admin",
          createdAt: new Date(now - i * 24 * 60 * 60 * 1000),
        });
        console.log(`  Inserted: "${n.title}"`);
        insertedCount++;
      }
    }

    console.log(`\nDone — ${insertedCount} inserted, ${skippedCount} skipped (already existed).`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
