// backend/server.js
require("dotenv").config(); // must be first
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// existing route imports
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const userRoutes = require("./routes/userRoutes");
const adminStatsRoutes = require("./routes/adminStatsRoutes");

dotenv.config();
const app = express();

app.use(
  cors({
    // origin: "https://cf-ladder.onrender.com",
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// 🔐 API Routes
// app.use("https://ladder-backend.onrender.com/api/admin", authRoutes);
// app.use("https://ladder-backend.onrender.com/api/problems", problemRoutes);
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
