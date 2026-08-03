import Scheme from "../models/Scheme.js";
import { SavedScheme } from "../models/SavedScheme.js";
import { SearchHistory } from "../models/SearchHistory.js";
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

// @desc    Save/bookmark a scheme
// @route   POST /api/schemes/:id/save
// @access  Protected
export const saveScheme = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: "Scheme not found" });
  }

  const alreadySaved = await SavedScheme.findOne({ user: req.user._id, name: scheme.title });
  if (alreadySaved) {
    return res.status(200).json({ success: true, message: "Scheme already saved", data: alreadySaved });
  }

  const category = (scheme.category || "General").toLowerCase();
  let icon = "Briefcase";
  let iconBg = "bg-slate-100";
  if (category.includes("agri") || category.includes("farm")) {
    icon = "Sprout";
    iconBg = "bg-blue-50";
  } else if (category.includes("health") || category.includes("care") || category.includes("medical")) {
    icon = "HeartPulse";
    iconBg = "bg-purple-50";
  } else if (category.includes("house") || category.includes("housing") || category.includes("shelter")) {
    icon = "Home";
    iconBg = "bg-orange-50";
  }

  const saved = await SavedScheme.create({
    user: req.user._id,
    name: scheme.title,
    subtitle: scheme.annualBenefit || "Eligible Scheme",
    icon,
    iconBg,
    status: "Eligible"
  });

  return successResponse(res, saved, 201);
};

// @desc    Unsave/unbookmark a scheme
// @route   DELETE /api/schemes/:id/save
// @access  Protected
export const unsaveScheme = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: "Scheme not found" });
  }

  await SavedScheme.deleteOne({ user: req.user._id, name: scheme.title });
  return successResponse(res, { message: "Scheme removed from saved list" });
};

// @desc    Check if scheme is saved
// @route   GET /api/schemes/:id/is-saved
// @access  Protected
export const isSchemeSaved = async (req, res) => {
  const scheme = await Scheme.findById(req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: "Scheme not found" });
  }

  const saved = await SavedScheme.findOne({ user: req.user._id, name: scheme.title });
  return successResponse(res, { isSaved: !!saved });
};

// @desc    Add search term to history
// @route   POST /api/schemes/search-history
// @access  Protected
export const addSearchHistory = async (req, res) => {
  const { term } = req.body;
  if (!term || term.trim() === "") {
    return res.status(400).json({ success: false, message: "Please provide a search term" });
  }

  const trimmedTerm = term.trim();

  // Keep search terms clean: only track if length is at least 3 characters
  if (trimmedTerm.length < 3) {
    return res.status(200).json({ success: true, message: "Search term too short to persist" });
  }

  const existing = await SearchHistory.findOne({ user: req.user._id, term: trimmedTerm });
  if (existing) {
    existing.updatedAt = new Date();
    await existing.save();
    return successResponse(res, existing);
  }

  const historyItem = await SearchHistory.create({
    user: req.user._id,
    term: trimmedTerm
  });

  return successResponse(res, historyItem, 201);
};