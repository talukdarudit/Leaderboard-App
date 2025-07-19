import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./lib/db.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();
app.use(cors({ origin: "https://leaderboard-app-frontend-mb1l.onrender.com", credentials: true }));
app.use(express.json());

app.use("/api", userRoutes);


app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
