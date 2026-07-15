import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isMobile = (value) => /^[6-9]\d{9}$/.test(value);

const handleLogin = async (req, res, role) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message:
          role === "admin"
            ? "Official email and password are required"
            : "Email/mobile and password are required",
      });
    }

    const trimmedIdentifier = identifier.trim();
    let query = null;

    if (role === "admin") {
      if (!isEmail(trimmedIdentifier)) {
        return res.status(400).json({
          success: false,
          message: "Enter a valid official email address",
        });
      }
      query = { email: trimmedIdentifier.toLowerCase() };
    } else if (isEmail(trimmedIdentifier)) {
      query = { email: trimmedIdentifier.toLowerCase() };
    } else if (isMobile(trimmedIdentifier)) {
      query = { mobile: trimmedIdentifier };
    }

    if (!query) {
      return res.status(400).json({
        success: false,
        message:
          role === "admin"
            ? "Enter a valid official email address"
            : "Enter a valid email or 10-digit mobile number",
      });
    }

    const user = await User.findOne({ ...query, role }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or role",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        fullName: user.fullName,
        state: user.state,
        occupation: user.occupation,
        incomeRange: user.incomeRange,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const loginCitizen = (req, res) => handleLogin(req, res, "citizen");
export const loginAdmin = (req, res) => handleLogin(req, res, "admin");

export const registerCitizen = async (req, res) => {
  try {
    const { fullName, email, mobile, state, occupation, incomeRange, password } = req.body;

    // Validate inputs
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid full name (minimum 2 characters)",
      });
    }

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number",
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    if (!state || !state.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select your state",
      });
    }

    if (!occupation || !occupation.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select your occupation",
      });
    }

    if (!incomeRange || !incomeRange.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select your income range",
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();

    // Check if email already exists
    const existingEmailUser = await User.findOne({ email: normalizedEmail });
    if (existingEmailUser) {
      return res.status(400).json({
        success: false,
        message: "Email address is already registered",
      });
    }

    // Check if mobile already exists
    const existingMobileUser = await User.findOne({ mobile: cleanMobile });
    if (existingMobileUser) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is already registered",
      });
    }

    // Create user
    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      mobile: cleanMobile,
      state: state.trim(),
      occupation: occupation.trim(),
      incomeRange: incomeRange.trim(),
      password,
      role: "citizen",
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        occupation: user.occupation,
        incomeRange: user.incomeRange,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, mobile, state, password } = req.body;

    // Validate inputs
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid full name (minimum 2 characters)",
      });
    }

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number",
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid official email address",
      });
    }

    if (!state || !state.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select your state",
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();

    // Check if email already exists
    const existingEmailUser = await User.findOne({ email: normalizedEmail });
    if (existingEmailUser) {
      return res.status(400).json({
        success: false,
        message: "Email address is already registered",
      });
    }

    // Check if mobile already exists
    const existingMobileUser = await User.findOne({ mobile: cleanMobile });
    if (existingMobileUser) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is already registered",
      });
    }

    // Create user
    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      mobile: cleanMobile,
      state: state.trim(),
      password,
      role: "admin",
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Admin registration successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin registration",
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
