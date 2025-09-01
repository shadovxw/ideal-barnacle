import express from "express";

import { mailer } from "../config/mail.js";

const router = express.Router();

// CREATE subscription
router.post("/createsubscription", async (req, res) => {
  try {
    const { email_id } = req.body;

    if (!email_id) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // ✅ prevent duplicate subscriptions
    const existing = await Subscription.findOne({ where: { email_id } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Already subscribed" });
    }

    // ✅ save subscription
    const newSub = await Subscription.create({ email_id });

    // ✅ try sending confirmation email
    try {
      await mailer.sendMail({
        from: `"VY FOUNDATION" <sir.dazai02@gmail.com>`,
        to: newSub.email_id,
        subject: "VY FOUNDATION - Subscription Confirmation",
        text: "Thank you for subscribing to updates from VY Foundation. We’re excited to have you!"
      });

      return res.status(201).json({
        success: true,
        message: "Subscription saved and email sent",
        subscription: newSub
      });
    } catch (emailError) {
      return res.status(201).json({
        success: true,
        message: "Subscription saved but email failed",
        subscription: newSub,
        error: emailError.message
      });
    }

  } catch (err) {
    console.error("Subscription error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
