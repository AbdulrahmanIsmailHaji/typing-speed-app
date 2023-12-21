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
    highScore15: {
      type: Number,
      required: true,
    },
    highScore30: {
      type: Number,
      required: true,
    },
    highScore60: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
