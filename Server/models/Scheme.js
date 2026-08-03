import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    name: {
      type: String,
      trim: true,
    },
    launchDate: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Published", "Under Review", "Draft", "Archived", "Approved"],
      default: "Draft",
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
    objective: {
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
    eligibility: {
      minAge: { type: Number, default: 0 },
      maxAge: { type: Number, default: 100 },
      genders: { type: [String], default: ["Any"] },
      occupations: { type: [String], default: ["Any"] },
      educationLevels: { type: [String], default: ["Any"] },
      annualIncomeMax: { type: Number, default: 0 },
      states: { type: [String], default: ["All India"] },
      districts: { type: [String], default: ["All"] },
      socialCategories: { type: [String], default: ["All"] },
      disabilityRequired: { type: Boolean, default: false },
      minorityRequired: { type: Boolean, default: false },
      farmerRequired: { type: Boolean, default: false },
      studentRequired: { type: Boolean, default: false },
      womenOnly: { type: Boolean, default: false },
      requiredDocuments: { type: [String], default: [] }
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
    helpline: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

schemeSchema.pre("validate", function() {
  if (this.name && (!this.title || !this.isModified("title"))) {
    this.title = this.name;
  } else if (this.title && (!this.name || !this.isModified("name"))) {
    this.name = this.title;
  }

  if (this.launchDate && (!this.publishedDate || this.publishedDate === "2024" || !this.isModified("publishedDate"))) {
    this.publishedDate = this.launchDate;
  } else if (this.publishedDate && (!this.launchDate || !this.isModified("launchDate"))) {
    this.launchDate = this.publishedDate;
  }
});

const Scheme = mongoose.model("Scheme", schemeSchema);

export default Scheme;
