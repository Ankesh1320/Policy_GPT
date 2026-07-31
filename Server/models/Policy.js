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
    description: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
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
    status: {
      type: String,
      enum: ["Published", "Under Review", "Draft", "Archived", "Approved"],
      default: "Draft",
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
  },
  { timestamps: true }
);

policySchema.pre("validate", function () {
  if (this.effectiveDate && !this.date) {
    this.date = this.effectiveDate;
  } else if (this.date && !this.effectiveDate) {
    this.effectiveDate = this.date;
  }
});

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
