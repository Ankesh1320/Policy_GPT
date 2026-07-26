import { Application } from "../models/Application.js";

const STATUS_TO_VARIANT = {
  Approved: "success",
  "Under Review": "warning",
  Submitted: "warning",
  Rejected: "danger",
};

export const getApplications = async (userId) => {
  const applications = await Application.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

  return applications.map((app) => ({
    id: app._id,
    name: app.schemeName,
    status: app.status,
    variant: STATUS_TO_VARIANT[app.status] || "warning",
  }));
};