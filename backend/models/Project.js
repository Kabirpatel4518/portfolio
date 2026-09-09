const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
