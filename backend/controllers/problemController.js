// controllers/problemController.js
const mongoose = require("mongoose");
const { getProblemModel } = require("../models/Problem");

// Create a new problem
const addProblem = async (req, res) => {
  const { rating } = req.params;
  const { Name, Link, Tags, Level, Knowledge } = req.body;

  try {
    const Problem = getProblemModel(rating);
    const newProblem = new Problem({
      Rating: rating,
      Name,
      Link,
      Tags,
      Level,
      Knowledge,
      deleteRequested: false,
      addedBy: req.admin.username,
    });

    await newProblem.save();
    res.status(201).json({ message: "Problem added successfully." });
  } catch (err) {
    console.error("Error adding problem:", err);
    res.status(500).json({ message: "Server error while adding problem." });
  }
};

// Get all problems by rating
const getProblemsByRating = async (req, res) => {
  const { rating } = req.params;

  try {
    const Problem = getProblemModel(rating);
    const problems = await Problem.find({});
    res.status(200).json(problems);
  } catch (err) {
    console.error("Error fetching problems:", err);
    res.status(500).json({ message: "Server error while fetching problems." });
  }
};

// Update a problem
const updateProblem = async (req, res) => {
  const { rating, id } = req.params;
  const { Name, Link, Tags, Level, Knowledge } = req.body;

  try {
    const Problem = getProblemModel(rating);
    const updated = await Problem.findByIdAndUpdate(
      id,
      { Name, Link, Tags, Level, Knowledge },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({ message: "Problem updated successfully." });
  } catch (err) {
    console.error("Error updating problem:", err);
    res.status(500).json({ message: "Server error while updating problem." });
  }
};

// Request to delete a problem
const requestDeleteProblem = async (req, res) => {
  const { rating, id } = req.params;

  try {
    const Problem = getProblemModel(rating);

    const problem = await Problem.findByIdAndUpdate(
      id,
      { deleteRequested: true },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({ message: "Delete request submitted." });
  } catch (err) {
    console.error("Error requesting delete:", err);
    res.status(500).json({ message: "Server error requesting delete." });
  }
};

// Approve delete by main admin
const approveDeleteProblem = async (req, res) => {
  const { rating, id } = req.params;

  try {
    const Problem = getProblemModel(rating);
    const problem = await Problem.findById(id);

    if (!problem || !problem.deleteRequested) {
      return res.status(404).json({ message: "Problem not pending deletion" });
    }

    await Problem.findByIdAndDelete(id);
    res.status(200).json({ message: "Problem permanently deleted." });
  } catch (err) {
    console.error("Error approving delete:", err);
    res.status(500).json({ message: "Server error during delete approval." });
  }
};

// 🔹 Deny a pending delete (main admin only)
const denyDeleteProblem = async (req, res) => {
  const { rating, id } = req.params;
  try {
    const Problem = getProblemModel(rating);

    const problem = await Problem.findByIdAndUpdate(
      id,
      { deleteRequested: false },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    res.status(200).json({ message: "Delete request denied." });
  } catch (err) {
    console.error("Error denying delete:", err);
    res.status(500).json({ message: "Server error while denying delete." });
  }
};

// Get all problems pending deletion
const getPendingDeletes = async (req, res) => {
  const { rating } = req.params;

  try {
    const Problem = getProblemModel(rating);
    const pending = await Problem.find({ deleteRequested: true });
    res.status(200).json(pending);
  } catch (err) {
    console.error("Error fetching pending deletes:", err);
    res.status(500).json({ message: "Server error fetching pending deletes." });
  }
};

module.exports = {
  addProblem,
  getProblemsByRating,
  updateProblem,
  requestDeleteProblem,
  approveDeleteProblem,
  getPendingDeletes,
  denyDeleteProblem,
};
