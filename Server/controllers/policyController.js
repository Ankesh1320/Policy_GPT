import Policy from "../models/Policy.js";
import { successResponse } from "../utils/apiResponse.js";

// @desc    Get all policies with optional filters
// @route   GET /api/policies
// @access  Protected
export const getPolicies = async (req, res) => {
  const { status, department } = req.query;
  const filter = {};

  if (req.user && req.user.role !== "admin") {
    filter.status = "Published";
  } else if (status && status !== "All Status") {
    filter.status = status;
  }

  if (department && department !== "All Departments") {
    filter.department = department;
  }

  const policies = await Policy.find(filter).sort({ createdAt: -1 });
  return successResponse(res, policies);
};

// @desc    Get single policy
// @route   GET /api/policies/:id
// @access  Protected
export const getPolicyById = async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  if (!policy) {
    return res.status(404).json({
      success: false,
      message: "Policy not found",
    });
  }
  return successResponse(res, policy);
};

// @desc    Create new policy
// @route   POST /api/policies
// @access  Protected/Admin
export const createPolicy = async (req, res) => {
  const { name, department } = req.body;

  if (!name || !department) {
    return res.status(400).json({
      success: false,
      message: "Please provide name and department",
    });
  }

  const policy = new Policy(req.body);
  const createdPolicy = await policy.save();
  return successResponse(res, createdPolicy, 201);
};

// @desc    Update policy
// @route   PUT /api/policies/:id
// @access  Protected/Admin
export const updatePolicy = async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    return res.status(404).json({
      success: false,
      message: "Policy not found",
    });
  }

  // Update fields
  Object.keys(req.body).forEach((key) => {
    policy[key] = req.body[key];
  });

  const updatedPolicy = await policy.save();
  return successResponse(res, updatedPolicy);
};

// @desc    Delete policy
// @route   DELETE /api/policies/:id
// @access  Protected/Admin
export const deletePolicy = async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    return res.status(404).json({
      success: false,
      message: "Policy not found",
    });
  }

  await Policy.deleteOne({ _id: req.params.id });
  return successResponse(res, { id: req.params.id, message: "Policy deleted successfully" });
};
