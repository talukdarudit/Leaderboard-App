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

const allowedOrigins = [
  "http://localhost:5173",
  "https://leaderboard-app-frontend-mb1l.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api", userRoutes);


app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
