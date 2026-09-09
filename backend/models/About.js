const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    objective: { type: String, required: true },
    desc: { type: String, required: true },
    languages: [{ type: String }],
    hobbies: [{ type: String }],
    profileImage: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    stats: {
      experience: { type: String, default: "0" },
      projects: { type: String, default: "0" },
      clients: { type: String, default: "0" }
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("About", AboutSchema);
