const express = require("express");
const cors = require("cors");
require("dotenv").config();

const itemsRouter = require("./routes/items");

const app = express();
// alow the backend to talk with the frontend
app.use(cors({
  origin: "http://localhost:5173", // my Vite port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/items", itemsRouter);

// test route
app.get("/", (req, res) => {
  res.send("Server running and CORS configured for Vite!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});