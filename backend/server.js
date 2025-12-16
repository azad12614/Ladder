// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// existing route imports
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const userRoutes = require("./routes/userRoutes");
const adminStatsRoutes = require("./routes/adminStatsRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://cf-ladder.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());

// 🔐 API Routes
app.use("/api/admin", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminStatsRoutes);

// 🌐 Connect to MongoDB and then start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
  });
});
