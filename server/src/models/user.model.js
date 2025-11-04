import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name:{
      type: String,
      required: [true, " name is required"],
      trim: true,
      minlength: [2, " name must be at least 2 characters"],
      maxlength: [50, " name cannot exceed 50 characters"],
    },
    
    email: {
      type: String,
      index : true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    // Profile Information
    username: {
      type: String,
      unique: true,
      trim: true,
      index : true,
      sparse: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer not to say"],
      lowercase: true,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },


    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      lowercase: true,
    },


    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationExpires: {
      type: Date,
      select: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {

    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to check if user is admin
userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

const User = mongoose.model("User", userSchema);

export default User;
