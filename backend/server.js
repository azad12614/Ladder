// server.js
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://cf-ladder.onrender.com",
    // origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// 🔐 API Routes
// app.use("https://ladder-backend.onrender.com/api/admin", authRoutes);
// app.use("https://ladder-backend.onrender.com/api/problems", problemRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/problems", problemRoutes);

// 🌐 Connect to MongoDB and then start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
  });
});
