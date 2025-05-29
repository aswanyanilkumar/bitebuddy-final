//models/restaurantModel.js
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or image path
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  foodItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem", // Reference to the FoodItem model
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);

