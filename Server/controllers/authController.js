import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isMobile = (value) => /^[6-9]\d{9}$/.test(value);

const handleLogin = async (req, res, role) => {
  console.log(`[LOGIN DEBUG] Attempting login: identifier="${req.body?.identifier}", role="${role}"`);
  try {
    const { identifier, password } = req.body;

    if (!identifier?.trim() || !password) {
      console.log(`[LOGIN DEBUG] Missing identifier or password`);
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
        console.log(`[LOGIN DEBUG] Admin email validation failed for: ${trimmedIdentifier}`);
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
      console.log(`[LOGIN DEBUG] Query generation failed for: ${trimmedIdentifier}`);
      return res.status(400).json({
        success: false,
        message:
          role === "admin"
            ? "Enter a valid official email address"
            : "Enter a valid email or 10-digit mobile number",
      });
    }

    console.log(`[LOGIN DEBUG] Querying user with:`, { ...query, role });
    const user = await User.findOne({ ...query, role }).select("+password");

    if (!user) {
      console.log(`[LOGIN DEBUG] No user found matching:`, { ...query, role });
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or role",
      });
    }

    console.log(`[LOGIN DEBUG] User found. Comparing passwords...`);
    const isMatch = await user.matchPassword(password);
    console.log(`[LOGIN DEBUG] Password match result:`, isMatch);

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

export const forgotPassword = async (req, res) => {
  console.log("[AUTH CONTROLLER] Processing forgotPassword request for identifier:", req.body?.identifier);
  try {
    const { identifier } = req.body;

    if (!identifier || !identifier.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number is required",
      });
    }

    const trimmed = identifier.trim();
    const isEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const normalizedIdentifier = isEmailAddress ? trimmed.toLowerCase() : trimmed;

    // Find the user using either email or mobileNumber (also checking mobile field for compatibility)
    const user = await User.findOne({
      $or: [
        { email: normalizedIdentifier },
        { email: trimmed },
        { mobileNumber: trimmed },
        { mobile: trimmed },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate a 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to the user document
    user.otp = otpCode;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    // Store in Otp collection for verification session consistency
    await Otp.deleteMany({ identifier: normalizedIdentifier });
    await Otp.create({ identifier: normalizedIdentifier, otp: otpCode });

    // Send via email if user has email or identifier is an email address
    const recipientEmail = user.email || (isEmailAddress ? normalizedIdentifier : null);

    if (recipientEmail) {
      const emailHtml = `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ffcd73; border-radius: 15px; background-color: #fff8de;">
          <h2 style="color: #242322; text-align: center;">Reset Your Password</h2>
          <p style="color: #4c3c35; font-size: 15px; line-height: 1.5;">Hello,</p>
          <p style="color: #4c3c35; font-size: 15px; line-height: 1.5;">We received a request to reset the password for your PolicyGPT account. Use the verification code below to proceed:</p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #fd7a08; letter-spacing: 4px; padding: 10px 20px; border: 2px dashed #fd7a08; border-radius: 10px; background-color: #ffffff;">${otpCode}</span>
          </div>
          <p style="color: #938e8c; font-size: 13px; line-height: 1.5;">This OTP code is valid for 5 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `;
      try {
        await sendEmail({
          to: recipientEmail,
          subject: "PolicyGPT - Password Reset Verification Code",
          html: emailHtml,
        });
      } catch (emailError) {
        console.warn("[SMTP WARNING] Email send failed (check SMTP credentials in .env):", emailError.message);
      }
    } else {
      console.log(`[SMS LOG] OTP for ${user.mobileNumber || user.mobile}: ${otpCode}`);
    }

    // Always log OTP to backend console so it can be viewed in terminal
    console.log("---------------------------------------------------------");
    console.log(`[OTP DEBUG] OTP Code for ${normalizedIdentifier}: ${otpCode}`);
    console.log("---------------------------------------------------------");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during forgot password process",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({
        success: false,
        message: "Identifier and OTP code are required",
      });
    }

    const trimmedIdentifier = identifier.trim().toLowerCase();
    const otpRecord = await Otp.findOne({ identifier: trimmedIdentifier });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired or is invalid",
      });
    }

    if (otpRecord.otp !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Incorrect verification code",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification code verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during OTP verification",
    });
  }
};

export const resendOtp = async (req, res) => {
  return forgotPassword(req, res);
};

export const resetPassword = async (req, res) => {
  try {
    const { identifier, otp, password } = req.body;

    if (!identifier || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (identifier, verification code, new password) are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const trimmedIdentifier = identifier.trim().toLowerCase();
    const otpRecord = await Otp.findOne({ identifier: trimmedIdentifier });

    if (!otpRecord || otpRecord.otp !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification session",
      });
    }

    const user = await User.findOne({
      $or: [
        { email: trimmedIdentifier },
        { mobileNumber: trimmedIdentifier },
        { mobile: trimmedIdentifier },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Save the new password (pre-save middleware on User will automatically hash this using bcrypt)
    user.password = password;
    await user.save();

    // Delete verified OTP record
    await Otp.deleteMany({ identifier: trimmedIdentifier });

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during password reset process",
    });
  }
};
