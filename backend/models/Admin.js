// model - admin
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["main_admin", "admin"], required: true },
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Admin", adminSchema);
