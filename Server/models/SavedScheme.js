import mongoose from "mongoose";

const savedSchemeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    subtitle: { type: String, default: "" },
    icon: { type: String, required: true },
    iconBg: { type: String, default: "bg-slate-100" },
    status: { type: String, default: null },
  },
  { timestamps: true }
);

export const SavedScheme = mongoose.model("SavedScheme", savedSchemeSchema);