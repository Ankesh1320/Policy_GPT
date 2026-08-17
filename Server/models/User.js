import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      sparse: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    fullName: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    incomeRange: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["citizen", "admin", "volunteer"],
      default: "citizen",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
