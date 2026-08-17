import mongoose from "mongoose";

const volunteerReviewSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      enum: ["policy", "scheme"],
      required: true,
    },
    action: {
      type: String,
      enum: ["approve", "request_changes"],
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    volunteerName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const VolunteerReview = mongoose.model("VolunteerReview", volunteerReviewSchema);

export default VolunteerReview;
