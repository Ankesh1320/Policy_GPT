import mongoose from "mongoose";

const reportHistorySchema = new mongoose.Schema(
  {
    reportName: {
      type: String,
      required: true,
    },
    reportType: {
      type: String,
      required: true,
      enum: ["Policy", "Scheme", "Department", "User Activity", "Analytics"],
    },
    status: {
      type: String,
      default: "Ready",
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    generatedByName: {
      type: String,
      required: true,
    },
    exportFormat: {
      type: String,
      required: true,
      enum: ["pdf", "excel", "both"],
    },
    fileName: {
      type: String,
      required: true,
    },
    parameters: {
      reportType: { type: String, required: true },
      department: { type: String, default: "All Departments" },
      startDate: { type: String },
      endDate: { type: String },
      status: { type: String, default: "All Status" },
      state: { type: String, default: "All States" },
      ministry: { type: String, default: "All Ministries" },
      category: { type: String, default: "All Categories" },
    },
  },
  { timestamps: true }
);

const ReportHistory = mongoose.model("ReportHistory", reportHistorySchema);

export default ReportHistory;
