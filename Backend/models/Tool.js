const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // Unique constraint directly in schema
  url: { type: String, required: true, unique: true },   // Unique constraint directly in schema
  description: { type: String, required: true },
  categories: [{ type: String }],
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// 🔧 Ensure indexes are created
ToolSchema.set("autoIndex", true); // Automatically create indexes in development

// Optional: Customize error messages for unique constraint violations
ToolSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    next(new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`));
  } else {
    next(error);
  }
});

// Optional: Handle duplicate errors during validation
ToolSchema.post("validate", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    next(new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`));
  } else {
    next(error);
  }
});

const Tool = mongoose.model("Tool", ToolSchema);

module.exports = Tool;