// models/foodItemModel.js
const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or image path
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Main Dish", "Starters", "Drinks & Juices", "Desserts"],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
