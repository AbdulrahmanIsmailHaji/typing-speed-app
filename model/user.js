// models/user.js
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    score15: {
      type: Number,
      required: true,
      default: 0, // Add a default value if needed
    },
    score30: {
      type: Number,
      required: true,
      default: 0,
    },
    score60: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
