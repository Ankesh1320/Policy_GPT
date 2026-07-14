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

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
