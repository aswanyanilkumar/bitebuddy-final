const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ['percentage', 'flat', 'delivery'], required: true },
  value: { type: Number, required: true },
  maxUses: { type: Number, default: 1 },
  expiresAt: { type: Date },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Coupon', couponSchema);
