const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;