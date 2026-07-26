import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    schemeName: { type: String, required: true },
    status: {
      type: String,
      enum: ["Approved", "Under Review", "Submitted", "Rejected"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);