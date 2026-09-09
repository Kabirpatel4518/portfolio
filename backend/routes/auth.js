const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Admin = require("../models/Admin");

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.adminId = decoded.id;
    } else if (decoded.username) {
      // Backwards compatibility for old tokens
      let admin = await Admin.findOne({ username: decoded.username });
      if (!admin) {
        admin = await Admin.create({
          username: "kabir",
          password: "@Kabir4518",
          email: "kabirpatel2882004@gmail.com",
        });
      }
      req.adminId = admin._id;
    }
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if an admin exists in DB, if not, create one using env vars
    let admin = await Admin.findOne();
    if (!admin) {
      admin = await Admin.create({
        username: "kabir",
        password: "@Kabir4518",
        email: "kabirpatel2882004@gmail.com",
      });
    }

    // Verify credentials
    if (admin.username === username && admin.password === password) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({ success: true, token });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get admin profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update admin profile
router.put("/profile", verifyToken, async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });

    if (username) admin.username = username;
    if (password) admin.password = password; // Should hash in real world, but keeping it plain for now
    if (email) admin.email = email;

    await admin.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
