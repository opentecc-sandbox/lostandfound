const express = require("express");
const router = express.Router();
const { prisma } = require("../lib/prisma");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Save to Neon via Prisma
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created", userId: newUser.id });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
});

module.exports = router;