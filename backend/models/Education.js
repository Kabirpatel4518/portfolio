const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: false },
    desc: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Education", EducationSchema);
