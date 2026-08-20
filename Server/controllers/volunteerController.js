import Scheme from "../models/Scheme.js";
import Policy from "../models/Policy.js";
import VolunteerReview from "../models/VolunteerReview.js";

/** GET /api/volunteer/dashboard — aggregate stats for the volunteer dashboard */
export const getDashboardStats = async (req, res) => {
  try {
    const volunteerId = req.user._id;

    const [
      pendingPolicies,
      pendingSchemes,
      approvedThisMonth,
      changesThisMonth,
      totalReviewed,
    ] = await Promise.all([
      Policy.countDocuments({ reviewStatus: "pending", status: "Under Review" }),
      Scheme.countDocuments({ reviewStatus: "pending", status: "Under Review" }),
      VolunteerReview.countDocuments({
        volunteerId,
        action: "approve",
        createdAt: { $gte: new Date(new Date().setDate(1)) },
      }),
      VolunteerReview.countDocuments({
        volunteerId,
        action: "request_changes",
        createdAt: { $gte: new Date(new Date().setDate(1)) },
      }),
      VolunteerReview.countDocuments({ volunteerId }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        pendingPolicies,
        pendingSchemes,
        approvedThisMonth,
        changesThisMonth,
        totalReviewed,
        avgReviewScore: 4.8,
      },
    });
  } catch (error) {
    console.error("getDashboardStats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** GET /api/volunteer/reviews/policies */
export const getPendingPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ reviewStatus: "pending", status: "Under Review" })
      .sort({ updatedAt: -1 })
      .limit(20)
      .lean();

    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    console.error("getPendingPolicies error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** GET /api/volunteer/reviews/schemes */
export const getPendingSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find({ reviewStatus: "pending", status: "Under Review" })
      .sort({ updatedAt: -1 })
      .limit(20)
      .lean();

    res.status(200).json({ success: true, data: schemes });
  } catch (error) {
    console.error("getPendingSchemes error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** GET /api/volunteer/reviews/recent — recent review activity for this volunteer */
export const getRecentActivity = async (req, res) => {
  try {
    const reviews = await VolunteerReview.find({ volunteerId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error("getRecentActivity error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * POST /api/volunteer/reviews/:type/:id
 * body: { action: "approve" | "request_changes", comment?: string }
 */
export const submitReview = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { action, comment } = req.body;

    if (!["policy", "scheme"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid item type" });
    }
    if (!["approve", "request_changes"].includes(action)) {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    const Model = type === "policy" ? Policy : Scheme;
    const item = await Model.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: `${type} not found` });
    }

    // Update the item's review fields
    item.reviewStatus = action === "approve" ? "approved" : "changes_requested";
    item.volunteerApproved = action === "approve";
    item.changesRequested = action === "request_changes";
    item.volunteerComment = comment || "";
    item.reviewedBy = req.user._id;
    item.reviewedAt = new Date();

    // If approved, set status to "Approved" so admin can publish
    if (action === "approve") {
      item.status = "Approved";
    } else {
      item.status = "Changes Requested";
    }

    await item.save();

    // Record the review log
    await VolunteerReview.create({
      itemId: id,
      itemType: type,
      action,
      comment: comment || "",
      volunteerId: req.user._id,
      volunteerName: req.user.fullName || "Volunteer",
    });

    res.status(200).json({
      success: true,
      message: action === "approve" ? "Item approved successfully" : "Changes requested",
    });
  } catch (error) {
    console.error("submitReview error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
