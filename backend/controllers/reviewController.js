//controllers/reviewController.js
const Review = require("../models/reviewModel");

exports.submitReview = async (req, res) => {
  try {
    const { foodItemId, rating, comment } = req.body;
    const userId = req.user;

    const newReview = new Review({
      user: userId,
      foodItem: foodItemId,
      rating,
      comment
    });

    const savedReview = await newReview.save();
    res.status(201).json({ message: "Review submitted", review: savedReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsForFoodItem = async (req, res) => {
  try {
    const { foodItemId } = req.params;
    const reviews = await Review.find({ foodItem: foodItemId }).populate("user", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

