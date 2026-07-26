import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    term: { type: String, required: true },
  },
  { timestamps: true }
);

export const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);