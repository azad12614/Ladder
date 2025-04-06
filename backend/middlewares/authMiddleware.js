// middlewares / authMiddleware.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Invalid or unknown token." });
    }

    req.admin = admin; // Attach to request for use in controllers
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please login again." });
  }
};

const requireMainAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== "main_admin") {
    return res
      .status(403)
      .json({ message: "Access forbidden. Main admin only." });
  }

  next();
};

module.exports = { verifyToken, requireMainAdmin };
