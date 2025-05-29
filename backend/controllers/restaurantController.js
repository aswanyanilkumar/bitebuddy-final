//controllers/restaurantController.js
const Restaurant = require("../models/restaurantModel");

const addRestaurant = async (req, res) => {
  try {
    const { name, address, image, description } = req.body;
    if (!name || !address || !image || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRestaurant = new Restaurant({ name, address, image, description });
    await newRestaurant.save();
    res.status(201).json({ message: "Restaurant added", restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Restaurant.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error while deleting restaurant" });
  }
};

module.exports = { addRestaurant, getAllRestaurants, getRestaurantById, deleteRestaurant };
