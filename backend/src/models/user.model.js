import { response } from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
      default: 0,
    },
    pointsHistory: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
