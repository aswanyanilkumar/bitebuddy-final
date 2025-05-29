//routes/restaurantRoutes.js
const express = require("express");
const { addRestaurant, getAllRestaurants, getRestaurantById,deleteRestaurant } = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

// Only admins can add restaurants
router.post("/add", authMiddleware, adminMiddleware, addRestaurant);

// Public route to fetch restaurants
router.get("/all", getAllRestaurants);

//  Get restaurant by ID
router.get("/:id", getRestaurantById);

//Delete restaurant by id
router.delete("/:id", authMiddleware, deleteRestaurant);


module.exports = router;
