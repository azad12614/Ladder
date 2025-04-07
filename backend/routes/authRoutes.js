// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  registerAdmin,
  recoverPassword,
  verifyOtp,
  updatePassword,
  getPendingAdmins,
  getAllAdmins,
  approveAdmin,
  denyAdmin,
  revokeAdmin,
} = require("../controllers/authController");
const {
  verifyToken,
  requireMainAdmin,
} = require("../middlewares/authMiddleware");

// Login route
router.post("/login", loginAdmin);

// Register new admin (pending approval)
router.post("/register", registerAdmin);

// Password Recovery
router.post("/recover-password", recoverPassword);
router.post("/verify-otp", verifyOtp);
router.post("/update-password", updatePassword);

// Get all pending admins - only accessible by main admin
router.get("/pending-admins", verifyToken, requireMainAdmin, getPendingAdmins); // ✅ Protected

// Approve an admin by ID - only main admin can do this
router.patch("/approve-admin/:id", verifyToken, requireMainAdmin, approveAdmin);

// Fetch all admins
router.get("/all", verifyToken, requireMainAdmin, getAllAdmins);

// Deny and delete unapproved admin
router.delete("/deny/:id", verifyToken, requireMainAdmin, denyAdmin);

// Revoke access (set isApproved = false)
router.post("/revoke/:id", verifyToken, requireMainAdmin, revokeAdmin);

module.exports = router;
