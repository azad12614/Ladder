// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { updateCounter, getStats } = require("../controllers/userController");

router.put("/count-user", updateCounter); // call this from "Set Handle" button

module.exports = router;
