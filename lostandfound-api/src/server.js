const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth");
const itemsRouter = require("./routes/items");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


app.use("/api/items", itemsRouter);


app.get("/", (req, res) => {
  res.send("Server running and CORS configured for Vite!");
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/api/items", itemsRouter);
app.use("/api/auth", authRouter); 