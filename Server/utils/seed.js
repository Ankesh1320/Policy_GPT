import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
import { SavedScheme } from "../models/SavedScheme.js";
import { Application } from "../models/Application.js";
import { Notification } from "../models/Notification.js";
import { SearchHistory } from "../models/SearchHistory.js";
import mongoose from "mongoose";
import { seedAnalyticsData } from "../scripts/seedAnalytics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toArray(str) {
  if (!str) return [];
  return str
    .split(/,|\. (?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function mapCategory(cat) {
  if (!cat) return "Financial Aid";
  const c = cat.toLowerCase();
  if (c.includes("agriculture") || c.includes("farming") || c.includes("rural development")) return "Agriculture";
  if (c.includes("health") || c.includes("insurance") || c.includes("medical")) return "Healthcare";
  if (c.includes("housing") || c.includes("shelter")) return "Housing";
  if (c.includes("education") || c.includes("scholarship")) return "Education";
  if (c.includes("women") || c.includes("child")) return "Women Welfare";
  if (c.includes("employment") || c.includes("skill") || c.includes("entrepreneurship") || c.includes("livelihood")) return "Employment";
  return "Financial Aid";
}

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    SavedScheme.deleteMany({}),
    Application.deleteMany({}),
    Notification.deleteMany({}),
    SearchHistory.deleteMany({}),
    Scheme.deleteMany({}),
  ]);

  const jsonPath = path.join(__dirname, "../data/government_schemes (1).json");
  const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const transformedSchemes = rawData.map((item) => {
    const normalizedCategory = mapCategory(item.schemeCategory);
    return {
      title: item.schemeName,
      department: item.ministryDepartment,
      category: normalizedCategory,
      description: item.schemeDescription,
      objective: item.objective,
      publishedDate: "2024",
      pdfLink: item.applicationUrl || "#",
      status: "Published",
      eligibilitySummary: item.eligibilityCriteria,
      applicationModeSummary: item.applicationProcess,
      documentsSummary: item.requiredDocuments,
      beneficiaries: item.beneficiaries || "Eligible citizens",
      annualBenefit: item.annualBenefit || "Specified financial/social benefits",
      helpline: item.helpline,
      eligibilityCriteria: {
        minAge: 0,
        maxAge: 100,
        states: item.state?.includes("All India") ? ["All India"] : [item.state],
        occupations: ["Any"],
        incomeRanges: ["All"],
      },
      eligibility: {
        minAge: 0,
        maxAge: 100,
        genders: ["Any"],
        occupations: ["Any"],
        educationLevels: item.educationCriteria?.toLowerCase().includes("no education")
          ? ["Any"]
          : toArray(item.educationCriteria),
        annualIncomeMax: 0,
        states: item.state?.includes("All India") ? ["All India"] : [item.state],
        districts: ["All"],
        socialCategories: ["All"],
        disabilityRequired: false,
        minorityRequired: false,
        farmerRequired: item.schemeCategory?.toLowerCase().includes("agriculture") || false,
        studentRequired: item.schemeCategory?.toLowerCase().includes("education") || false,
        womenOnly: item.schemeCategory?.toLowerCase().includes("women") || false,
        requiredDocuments: toArray(item.requiredDocuments),
      },
      benefits: item.benefits ? [item.benefits] : [],
      documentsRequired: toArray(item.requiredDocuments),
      applicationUrl: item.applicationUrl || "#",
      tags: [normalizedCategory, item.ministryDepartment].filter(Boolean),
    };
  });

  await Scheme.insertMany(transformedSchemes);

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

  const adminUser = await User.create({
    fullName: "System Admin",
    email: "admin@admin.com",
    password: "password123",
    role: "admin",
    state: "All India",
    occupation: "Salaried Employee",
    incomeRange: "Above ₹12 Lakh",
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

  // Seed AI queries for dashboard analytics
  await seedAnalyticsData([user, adminUser]);

  console.log("Database seeded successfully.");
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});