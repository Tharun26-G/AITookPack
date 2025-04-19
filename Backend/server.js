const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const toolRoutes = require("./routes/tools");
const WebSocket = require("ws");
const { MongoClient } = require("mongodb");

dotenv.config();
const app = express();

// Middleware
const frontendUrl = process.env.FRONTEND_URL;
const corsOptions = {
  origin: "*", // Replace with your frontend domain
  methods: "GET,POST,PUT",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/tools", toolRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// WebSocket Setup
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  ws.on("close", () => console.log("WebSocket client disconnected"));
});

// MongoDB Change Stream
const client = new MongoClient(process.env.MONGODB_URI);
async function watchTools() {
  try {
    await client.connect();
    const db = client.db("tooldb");
    const collection = db.collection("tools");
    const changeStream = collection.watch();
    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(change.fullDocument));
          }
        });
      }
    });
  } catch (err) {
    console.error("Change Stream error:", err);
  }
}

watchTools();