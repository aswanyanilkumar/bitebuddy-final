//routes/cartRoutes.js
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController");

router.post("/add", authMiddleware, addToCart);
router.delete("/remove", authMiddleware, removeFromCart);
router.get("/", authMiddleware, getCart);

module.exports = router;


