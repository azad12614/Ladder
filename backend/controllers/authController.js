// authcontrollers
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check if approved (for non-main admins)
    if (admin.role !== "main_admin" && !admin.isApproved) {
      return res
        .status(403)
        .json({ message: "Admin not approved by main admin." });
    }

    // Generate token BEFORE sending any response
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Respond with token and admin info
    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email or username already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }],
    });

    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Username or email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin with isApproved: false
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      isApproved: false,
    });

    try {
      await newAdmin.save();
      console.log("✅ New admin saved:", newAdmin); // 🧠 debug
    } catch (saveErr) {
      console.error("❌ Error saving admin:", saveErr); // 🧠 debug
    }

    res
      .status(201)
      .json({ message: "Admin registered. Awaiting approval by main admin." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

const getPendingAdmins = async (req, res) => {
  try {
    const pendingAdmins = await Admin.find({
      isApproved: false,
      role: "admin",
    }).select("-password");
    res.status(200).json(pendingAdmins);
  } catch (err) {
    console.error("Error fetching pending admins:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching pending admins." });
  }
};

const approveAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.isApproved) {
      return res.status(400).json({ message: "Admin is already approved" });
    }

    admin.isApproved = true;
    await admin.save();

    res.status(200).json({ message: "Admin approved successfully" });
  } catch (err) {
    console.error("Error approving admin:", err);
    res.status(500).json({ message: "Server error while approving admin" });
  }
};

const denyAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const admin = await Admin.findById(adminId);
    if (!admin || admin.isApproved) {
      return res
        .status(400)
        .json({ message: "Cannot deny approved or non-existent admin" });
    }

    await Admin.findByIdAndDelete(adminId);
    res.status(200).json({ message: "Admin denied and deleted" });
  } catch (err) {
    console.error("Error denying admin:", err);
    res.status(500).json({ message: "Server error while denying admin" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (err) {
    console.error("Error fetching all admins:", err);
    res.status(500).json({ message: "Server error while fetching admins." });
  }
};

const revokeAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const admin = await Admin.findById(adminId);
    if (!admin || !admin.isApproved) {
      return res
        .status(400)
        .json({ message: "Cannot revoke unapproved or non-existent admin" });
    }

    admin.isApproved = false;
    await admin.save();

    res.status(200).json({ message: "Admin access revoked" });
  } catch (err) {
    console.error("Error revoking admin access:", err);
    res.status(500).json({ message: "Server error while revoking access" });
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  getPendingAdmins,
  approveAdmin,
  denyAdmin,
  revokeAdmin,
  getAllAdmins,
};
