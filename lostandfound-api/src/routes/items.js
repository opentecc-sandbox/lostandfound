// backend/routes/items.js
const express = require("express");
const router = express.Router();
const { prisma } = require("../lib/prisma");
 // Import the client we just made

// GET all items (with basic filtering)
router.get("/", async (req, res) => {
  const { type, category } = req.query; // e.g., /api/items?type=LOST
  try {
    const items = await prisma.item.findMany({
      where: {
        type: type || undefined,
        category: category || undefined,
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// POST a new item (Report Lost/Found)
router.post("/", async (req, res) => {
  const { title, description, category, location, type, date, userId } = req.body;
  try {
    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        category,
        location,
        type, // Must be "LOST" or "FOUND"
        date: new Date(date),
        userId: parseInt(userId), // Temporary until we add Auth
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Check your data fields" });
  }
});

module.exports = router;