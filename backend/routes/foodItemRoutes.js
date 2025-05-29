// routes/foodItemRoutes.js

const express = require("express");
const {
    createFoodItem, getAllFoodItems, getFoodByCategory, getFoodByRestaurant,
    getFoodItemById, updateFoodItem, deleteFoodItem
} = require("../controllers/foodItemController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createFoodItem);
router.get("/", getAllFoodItems);
router.get("/category/:category", getFoodByCategory);
router.get("/restaurant/:restaurantId", getFoodByRestaurant);
router.get("/:id", getFoodItemById); 
router.put("/:id", authMiddleware, adminMiddleware, updateFoodItem); 
router.delete("/:id", authMiddleware, adminMiddleware, deleteFoodItem); 

module.exports = router;
