import express from "express";
import {
  addUser,
  claimPoint,
  getUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/adduser", addUser);
router.post("/claimpoint", claimPoint);
router.get("/getusers", getUsers);

export default router;
