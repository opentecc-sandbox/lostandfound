const express = require("express");
const cors = require("cors");
require("dotenv").config();

const itemsRouter = require("./routes/items");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/items", itemsRouter);

// test route
app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});