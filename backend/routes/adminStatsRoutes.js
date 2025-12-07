// backend/routes/adminStatsRoutes.js
const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminStatsController");
const {
  verifyToken,
  requireMainAdmin,
} = require("../middlewares/authMiddleware");

// GET /api/admin/stats  (protected: only main_admin)
router.get("/stats", verifyToken, requireMainAdmin, getAdminStats);

module.exports = router;
