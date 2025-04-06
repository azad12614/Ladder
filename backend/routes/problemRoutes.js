const express = require("express");
const router = express.Router();
const {
  addProblem,
  getProblemsByRating,
  updateProblem,
  requestDeleteProblem,
  getPendingDeletes,
  approveDeleteProblem,
  denyDeleteProblem,
} = require("../controllers/problemController");
const {
  verifyToken,
  requireMainAdmin,
} = require("../middlewares/authMiddleware");

// 🔹 Add a problem (admin only)
router.post("/:rating", verifyToken, addProblem);

// 🔹 Get problems by rating (public or logged in user)
router.get("/:rating", getProblemsByRating);

// 🔹 Update problem by ID (admin only)
router.put("/:rating/:id", verifyToken, updateProblem);

// 🔹 Request deletion (admin only, NOT main_admin only)
router.delete("/:rating/:id", verifyToken, requestDeleteProblem);

// 🔹 View pending deletions (main admin only)
router.get(
  "/pending-deletions/:rating",
  verifyToken,
  requireMainAdmin,
  getPendingDeletes
);

// 🔹 Approve and delete (main admin only)
router.delete(
  "/approve-delete/:rating/:id",
  verifyToken,
  requireMainAdmin,
  approveDeleteProblem
);

router.patch(
  "/deny-delete/:rating/:id",
  verifyToken,
  requireMainAdmin,
  denyDeleteProblem
);

module.exports = router;
