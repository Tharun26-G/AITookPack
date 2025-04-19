const express = require("express");
const router = express.Router();
const Tool = require("../models/Tool");
const { MongoClient } = require("mongodb");

// POST: Submit a new tool
router.post("/", async (req, res) => {
  try {
    const { title, url, description, categories, price } = req.body;
    const tool = new Tool({ title, url, description, categories, price });
    await tool.save();
    res.status(201).json({ message: "Tool submitted successfully", tool });
  } catch (error) {
    res.status(500).json({ message: "Error submitting tool", error: error.message });
  }
});

// GET: Fetch all tools
router.get("/", async (req, res) => {
  try {
    const tools = await Tool.find().sort({ createdAt: -1 });
    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tools", error: error.message });
  }
});

module.exports = router;