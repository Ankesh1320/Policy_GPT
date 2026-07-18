import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    eligibleSchemesCount: { type: Number, default: 0 },
    savedSchemesCount: { type: Number, default: 0 },
    applicationsCount: { type: Number, default: 0 },
    deadlinesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);