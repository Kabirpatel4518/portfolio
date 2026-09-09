const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", ExperienceSchema);
