//routes/reviewRoutes.js
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { submitReview, getReviewsForFoodItem } = require("../controllers/reviewController");

router.post("/submit", authMiddleware, submitReview);
router.get("/:foodItemId", getReviewsForFoodItem);

module.exports = router;

