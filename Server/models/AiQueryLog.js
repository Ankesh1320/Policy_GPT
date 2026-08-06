import mongoose from "mongoose";

const aiQueryLogSchema = new mongoose.Schema(
  {
    queryText: { type: String, required: true },
    category: {
      type: String,
      enum: ["Education", "Healthcare", "Agriculture", "Employment", "Housing", "Women & Child", "Finance"],
      required: true,
    },
    responseTimeMs: { type: Number, required: true },
    status: { type: String, enum: ["success", "failed"], default: "success" },
    retrievalSuccess: { type: Boolean, default: true },
    feedback: { type: String, enum: ["positive", "negative", "none"], default: "none" },
    matchedPolicy: { type: String }, // Name of matched policy or scheme
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AiQueryLog = mongoose.model("AiQueryLog", aiQueryLogSchema);
