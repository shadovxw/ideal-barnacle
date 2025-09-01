import express from "express";
import User from "../models/user.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET users by email
router.get("/withemail/:emailid", async (req, res) => {
  try {
    const { emailid } = req.params;
    const users = await User.findAll({ where: { email: emailid } });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CREATE new user
router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const newUser = await User.create(data);
    res.json({ success: true, message: "Data saved successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// UPDATE user
router.put("/update", async (req, res) => {
  try {
    const data = req.body;
    const { id, ...updates } = data;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.update(updates);
    res.json({ success: true, message: "Data updated", user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE user
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.destroy();
    res.json({ success: true, message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
