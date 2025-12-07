// backend/controllers/adminStatsController.js
const Admin = require("../models/Admin");

const getAdminStats = async (req, res) => {
  try {
    const total = await Admin.countDocuments();
    const pending = await Admin.countDocuments({ isApproved: false });
    const approved = await Admin.countDocuments({ isApproved: true });

    return res.status(200).json({ total, pending, approved });
  } catch (err) {
    console.error("getAdminStats error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminStats };
