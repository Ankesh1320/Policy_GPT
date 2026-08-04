import Feedback from "../models/Feedback.js";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const createFeedback = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    const errors = {};
    if (!fullName || !fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!email || !email.trim()) {
      errors.email = "Email address is required";
    } else if (!isEmail(email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!subject || !subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!message || !message.trim()) {
      errors.message = "Message is required";
    } else if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const newFeedback = new Feedback({
      user: req.user ? req.user._id : null,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await newFeedback.save();

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: newFeedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving feedback",
    });
  }
};
