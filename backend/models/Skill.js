const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", SkillSchema);
