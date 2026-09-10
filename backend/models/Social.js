const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Social", SocialSchema);
