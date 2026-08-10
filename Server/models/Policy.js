import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    name: {
      type: String,
      required: [true, "Policy name is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    effectiveDate: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    published: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Published", "Under Review", "Draft", "Archived", "Approved"],
      default: "Draft",
    },
    eligibility: {
      type: [String],
      default: [],
    },
    pdf: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: "FileText",
    },
    iconBg: {
      type: String,
      default: "#faf5ff",
    },
    iconColor: {
      type: String,
      default: "#a855f7",
    },
    vision: {
      type: String,
      trim: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    keyBenefits: [
      {
        icon: String,
        title: String,
        desc: String,
        color: String,
        bg: String,
      }
    ],
    whoIsAffected: [
      {
        title: String,
        desc: String,
        isPrimary: Boolean,
        icon: String,
      }
    ],
    importantChanges: [
      {
        title: String,
        desc: String,
      }
    ],
    timeline: [
      {
        year: String,
        title: String,
        desc: String,
      }
    ],
    faqs: [
      {
        q: String,
        a: String,
      }
    ],
  },
  { timestamps: true }
);

policySchema.pre("validate", function () {
  if (this.effectiveDate && !this.date) {
    this.date = this.effectiveDate;
  } else if (this.date && !this.effectiveDate) {
    this.effectiveDate = this.date;
  }
  if (this.name && !this.title) {
    this.title = this.name;
  } else if (this.title && !this.name) {
    this.name = this.title;
  }
  if (this.effectiveDate && !this.published) {
    this.published = this.effectiveDate;
  } else if (this.published && !this.effectiveDate) {
    this.effectiveDate = this.published;
  }
});

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
