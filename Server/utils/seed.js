import { connectDB } from "../config/db.js";
import  User from "../src/models/User.js";
import { SavedScheme } from "../src/models/SavedScheme.js";
import { Application } from "../src/models/Application.js";
import { Notification } from "../src/models/Notification.js";
import { SearchHistory } from "../src/models/SearchHistory.js";
import mongoose from "mongoose";

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    SavedScheme.deleteMany({}),
    Application.deleteMany({}),
    Notification.deleteMany({}),
    SearchHistory.deleteMany({}),
  ]);

  const user = await User.create({
  fullName: "Rahul Verma",
  email: "rahul.verma@example.com",
  mobile: "9876543210",
  password: "Password@123",

  role: "citizen",
  state: "Uttar Pradesh",
  occupation: "Student",
  incomeRange: "Below ₹2 Lakh",

  eligibleSchemesCount: 18,
  savedSchemesCount: 12,
  applicationsCount: 3,
  deadlinesCount: 5,
  });

  await SavedScheme.insertMany([
    { user: user._id, name: "PM Kisan Samman Nidhi", subtitle: "₹6,000 / year", icon: "Sprout", iconBg: "bg-blue-50", status: "Eligible" },
    { user: user._id, name: "Ayushman Bharat PM-JAY", subtitle: "₹5 Lakh health cover", icon: "HeartPulse", iconBg: "bg-purple-50", status: null },
    { user: user._id, name: "PM Awas Yojana – Urban", subtitle: "₹2.67 Lakh subsidy", icon: "Home", iconBg: "bg-orange-50", status: "Eligible" },
    { user: user._id, name: "Sukanya Samriddhi Yojana", subtitle: "8.2% interest p.a.", icon: "Briefcase", iconBg: "bg-slate-100", status: "Eligible" },
  ]);

  await Application.insertMany([
    { user: user._id, schemeName: "PM Kisan", status: "Approved" },
    { user: user._id, schemeName: "PM Awas Yojana", status: "Under Review" },
    { user: user._id, schemeName: "MUDRA Loan", status: "Submitted" },
  ]);

  const now = Date.now();
  await Notification.insertMany([
    { user: user._id, title: "PM Kisan 17th installment released", isRead: false, createdAt: new Date(now - 2 * 60 * 60 * 1000) },
    { user: user._id, title: "Scholarship deadline in 5 days", isRead: false, createdAt: new Date(now - 24 * 60 * 60 * 1000) },
    { user: user._id, title: "New scheme added: MUDRA Tarun", isRead: true, createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000) },
  ]);

  await SearchHistory.insertMany(
    ["PM Kisan", "Scholarship", "MUDRA Loan", "Healthcare", "Housing Loan"].map(
      (term) => ({ user: user._id, term })
    )
  );

  console.log("Database seeded successfully.");
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});