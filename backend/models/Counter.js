// backend/models/Counter.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, default: "Total" },
  count: { type: Number, default: 1 },
});

module.exports = mongoose.model("Counter", counterSchema);
