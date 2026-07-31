import Scheme from "../models/Scheme.js";
import { successResponse } from "../utils/apiResponse.js";

// @desc    Get all schemes with optional filters
// @route   GET /api/schemes
// @access  Protected
export const getSchemes = async (req, res) => {
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

  const schemes = await Scheme.find(filter).sort({ createdAt: -1 });
  return successResponse(res, schemes);
};

// @desc    Get single scheme
// @route   GET /api/schemes/:id
// @access  Protected
export const getSchemeById = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);
  if (!scheme) {
    return res.status(404).json({
      success: false,
      message: "Scheme not found",
    });
  }
  return successResponse(res, scheme);
};

// @desc    Create new scheme
// @route   POST /api/schemes
// @access  Protected/Admin
export const createScheme = async (req, res) => {
  const { name, department, category } = req.body;

  if (!name || !department || !category) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, department, and category",
    });
  }

  const scheme = new Scheme(req.body);
  const createdScheme = await scheme.save();
  return successResponse(res, createdScheme, 201);
};

// @desc    Update scheme
// @route   PUT /api/schemes/:id
// @access  Protected/Admin
export const updateScheme = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);

  if (!scheme) {
    return res.status(404).json({
      success: false,
      message: "Scheme not found",
    });
  }

  // Update fields
  Object.keys(req.body).forEach((key) => {
    scheme[key] = req.body[key];
  });

  const updatedScheme = await scheme.save();
  return successResponse(res, updatedScheme);
};

// @desc    Delete scheme
// @route   DELETE /api/schemes/:id
// @access  Protected/Admin
export const deleteScheme = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);

  if (!scheme) {
    return res.status(404).json({
      success: false,
      message: "Scheme not found",
    });
  }

  await Scheme.deleteOne({ _id: req.params.id });
  return successResponse(res, { id: req.params.id, message: "Scheme deleted successfully" });
};