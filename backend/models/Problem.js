// models/Problem.js
const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  Rating: { type: Number, required: true },
  Link: { type: String, required: true },
  Name: { type: String, required: true },
  Tags: { type: String, required: true },
  Level: { type: Number, required: true },
  Knowledge: { type: String, required: true },
  addedBy: { type: String, required: true },
  deleteRequested: { type: Boolean, default: false },
});

const getProblemModel = (rating) => mongoose.model(`${rating}`, problemSchema);

module.exports = { getProblemModel };
