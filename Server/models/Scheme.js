import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Scheme title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    shortDepartment: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    badgeTag: {
      type: String,
      default: "POPULAR",
    },
    colorTheme: {
      type: String,
      default: "green",
    },
    description: {
      type: String,
      trim: true,
    },
    annualBenefit: {
      type: String,
      trim: true,
    },
    beneficiaries: {
      type: String,
      trim: true,
    },
    eligibilitySummary: {
      type: String,
      trim: true,
    },
    applicationModeSummary: {
      type: String,
      trim: true,
    },
    documentsSummary: {
      type: String,
      trim: true,
    },
    deadline: {
      type: String,
      default: "Ongoing",
    },
    eligibleForYou: {
      type: Boolean,
      default: true,
    },
    publishedDate: {
      type: String,
      default: "2024",
    },
    pdfLink: {
      type: String,
      default: "#",
    },
    eligibilityCriteria: {
      minAge: { type: Number, default: 0 },
      maxAge: { type: Number, default: 100 },
      states: { type: [String], default: ["All India"] },
      occupations: { type: [String], default: ["Any"] },
      incomeRanges: { type: [String], default: ["All"] },
    },
    financial: {
      maxBenefit: { type: String },
      benefitType: { type: String },
      transferMode: { type: String },
    },
    benefits: {
      type: [String],
      default: [],
    },
    documentsRequired: {
      type: [String],
      default: ["Aadhaar Card", "Income Certificate", "Bank Passbook"],
    },
    applicationUrl: {
      type: String,
      default: "#",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Scheme = mongoose.model("Scheme", schemeSchema);

export default Scheme;
