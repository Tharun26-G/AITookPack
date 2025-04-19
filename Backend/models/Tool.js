const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  categories: [{ type: String }],
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure indexes are created
ToolSchema.set('autoIndex', true);
ToolSchema.index({ title: 1 }, { unique: true });
ToolSchema.index({ url: 1 }, { unique: true });

const Tool = mongoose.model("Tool", ToolSchema);

module.exports = Tool;
