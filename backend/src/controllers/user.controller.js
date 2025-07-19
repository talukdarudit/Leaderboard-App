import { ObjectId } from "mongodb";
import User from "../models/user.model.js";

export const addUser = async (req, res) => {
  try {
    const { fullName } = req.body;
    const user = await User.findOne({ fullName });
    if (user) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      fullName,
    });

    if (newUser) {
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in addUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const claimPoint = async (req, res) => {
  try {
    const { userId, point } = req.body;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    if (user) {
      user.totalPoints += point;
      user.pointsHistory.push({
        point: point,
        claimedAt: new Date(),
      });
      await user.save();

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        totalPoints: user.totalPoints,
      });
    }
  } catch (error) {
    console.log("Error in claimPoint controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find({}).sort({ totalPoints: -1 });
    if (!Users || Users.length === 0)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json(Users);
  } catch (error) {
    console.error("Error in getUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
