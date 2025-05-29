//routes/paymentRoutes.js
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { processPayment } = require("../controllers/paymentController");

router.post("/process", authMiddleware, processPayment);

module.exports = router;

