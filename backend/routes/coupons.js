const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const authMiddleware = require('../middleware/auth'); // if needed

router.post('/validate', authMiddleware, async (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon) {
    return res.status(404).json({ error: "Invalid coupon code." });
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return res.status(400).json({ error: "Coupon has expired." });
  }

  if (coupon.maxUses && coupon.usedBy.length >= coupon.maxUses) {
    return res.status(400).json({ error: "Coupon usage limit reached." });
  }

  if (coupon.usedBy.includes(userId)) {
    return res.status(400).json({ error: "You have already used this coupon." });
  }

  return res.json({
    code: coupon.code,
    type: coupon.type,
    value: coupon.value,
  });
});
