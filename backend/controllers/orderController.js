//controllers/orderController.js
const Order = require("../models/orderModel");
const FoodItem = require("../models/foodItemModel");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { restaurant, items } = req.body;

    if (!restaurant || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Please provide restaurant and order items" });
    }

    let totalPrice = 0;

    for (const item of items) {
      const food = await FoodItem.findById(item.foodItem);
      if (!food) return res.status(404).json({ error: "Food item not found" });
      totalPrice += food.price * item.quantity;
    }

    const newOrder = new Order({
      user: userId,
      restaurant,
      items,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({ user: userId })
      .populate("restaurant", "name")
      .populate("items.foodItem", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.foodItem", "name price");

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
};
