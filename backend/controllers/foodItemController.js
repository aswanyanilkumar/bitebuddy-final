// controllers/foodItemController.js
const FoodItem = require("../models/foodItemModel");

const createFoodItem = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const foodItem = new FoodItem(req.body);
    const savedItem = await foodItem.save();
    res.status(201).json({ message: "Food item created", foodItem: savedItem });
  } catch (error) {
    console.error("Error while creating food item:", error);
    res.status(500).json({ error: "Failed to create food item" });
  }
};

const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find().populate("restaurant");
    res.status(200).json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

const getFoodByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foodItems = await FoodItem.find({ category });
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

const getFoodByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foodItems = await FoodItem.find({ restaurant: restaurantId });
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

const getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id).populate("restaurant");
    if (!foodItem) {
      return res.status(404).json({ error: "Food item not found" });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    console.error("Error fetching food item:", error);
    res.status(500).json({ error: "Failed to fetch food item" });
  }
};

const updateFoodItem = async (req, res) => {
  try {
    const updatedItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Food item not found" });
    }
    res.status(200).json({ message: "Food item updated", foodItem: updatedItem });
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({ error: "Failed to update food item" });
  }
};

const deleteFoodItem = async (req, res) => {
  try {
    const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ error: "Failed to delete food item" });
  }
};

module.exports = {
  createFoodItem,
  getAllFoodItems,
  getFoodByCategory,
  getFoodByRestaurant,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem
};

