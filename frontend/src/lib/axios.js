import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"https://leaderboard-app-backend-ksxs.onrender.com/api",
  withCredentials: true,
});
