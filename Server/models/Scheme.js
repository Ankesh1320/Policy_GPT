import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
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
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
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
