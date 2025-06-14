// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    handle: { type: String, unique: true, required: true },
    counter: { type: Number, default: 1 }, // how many times this handle was submitted
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
