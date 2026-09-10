const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Models
const About = require("../models/About");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Social = require("../models/Social");
const Contact = require("../models/Contact");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// --- PUBLIC ROUTES (For Frontend) ---

// Get all data at once for the main portfolio
router.get("/data", async (req, res) => {
  try {
    const about = await About.findOne();
    const projects = await Project.find();
    const skills = await Skill.find();
    const experience = await Experience.find();
    const education = await Education.find();
    const socials = await Social.find();

    res.json({
      about: about || {},
      stats: about?.stats || {},
      projects: projects || [],
      skills: skills || [],
      experience: experience || [],
      education: education || [],
      socials: socials || [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- PROTECTED ROUTES (For Admin Panel) ---

// ABOUT
router.get("/about", protect, async (req, res) => {
  const about = await About.findOne();
  res.json(about || {});
});
router.put("/about", protect, async (req, res) => {
  let about = await About.findOne();
  if (about) {
    about = await About.findOneAndUpdate({}, req.body, { new: true });
  } else {
    about = await About.create(req.body);
  }
  res.json(about);
});

// PROJECTS
router.get("/projects", protect, async (req, res) =>
  res.json(await Project.find()),
);
router.post("/projects", protect, async (req, res) =>
  res.json(await Project.create(req.body)),
);
router.put("/projects/:id", protect, async (req, res) =>
  res.json(
    await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  ),
);
router.delete("/projects/:id", protect, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// SKILLS
router.get("/skills", protect, async (req, res) =>
  res.json(await Skill.find()),
);
router.post("/skills", protect, async (req, res) =>
  res.json(await Skill.create(req.body)),
);
router.put("/skills/:id", protect, async (req, res) =>
  res.json(
    await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  ),
);
router.delete("/skills/:id", protect, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// EXPERIENCE
router.get("/experience", protect, async (req, res) =>
  res.json(await Experience.find()),
);
router.post("/experience", protect, async (req, res) =>
  res.json(await Experience.create(req.body)),
);
router.put("/experience/:id", protect, async (req, res) =>
  res.json(
    await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  ),
);
router.delete("/experience/:id", protect, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// EDUCATION
router.get("/education", protect, async (req, res) =>
  res.json(await Education.find()),
);
router.post("/education", protect, async (req, res) =>
  res.json(await Education.create(req.body)),
);
router.put("/education/:id", protect, async (req, res) =>
  res.json(
    await Education.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  ),
);
router.delete("/education/:id", protect, async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// CONTACTS
router.get("/contacts", protect, async (req, res) =>
  res.json(await Contact.find().sort({ createdAt: -1 })),
);
router.put("/contacts/:id", protect, async (req, res) =>
  res.json(
    await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    ),
  ),
);
router.delete("/contacts/:id", protect, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// SOCIALS
router.get("/socials", protect, async (req, res) =>
  res.json(await Social.find()),
);
router.post("/socials", protect, async (req, res) =>
  res.json(await Social.create(req.body)),
);
router.put("/socials/:id", protect, async (req, res) =>
  res.json(
    await Social.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  ),
);
router.delete("/socials/:id", protect, async (req, res) => {
  await Social.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// UPLOAD API
router.post("/upload", protect, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

module.exports = router;
