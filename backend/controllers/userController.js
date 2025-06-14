// backend/controllers/userController.js
const User = require("../models/User");
const Counter = require("../models/Counter");

const updateCounter = async (req, res) => {
  const { handle } = req.body;

  if (!handle) {
    return res.status(400).json({ message: "Handle is required." });
  }

  try {
    // Increment or create user-specific counter
    let user = await User.findOne({ handle });
    if (user) {
      user.counter += 1;
      await user.save();
    } else {
      user = await User.create({ handle, counter: 1 });
    }

    // Increment global counter
    let total = await Counter.findOne({ name: "Total" });
    if (total) {
      total.count += 1;
      await total.save();
    } else {
      total = await Counter.create({ name: "Total", count: 1 });
    }

    // ✅ Return both counters as JSON
    return res.status(200).json({
      message: "Counter updated successfully.",
      total: total.count,
      user: user.counter,
    });
  } catch (err) {
    console.error("Update counter error:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { updateCounter };
