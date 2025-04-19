const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: String }],
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tool", ToolSchema);