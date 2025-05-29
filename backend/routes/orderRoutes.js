//routes/orderRoutes.js
const express = require("express");
const { placeOrder, getUserOrders, updateOrderStatus,getAllOrders } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

const orderRouter = express.Router();

// User places an order
orderRouter.post("/place", authMiddleware, placeOrder);

// User can view their orders
orderRouter.get("/my-orders", authMiddleware, getUserOrders);

// Admin updates order status
orderRouter.patch("/update-status/:orderId", authMiddleware, updateOrderStatus);

// Admin gets all orders
orderRouter.get("/all", authMiddleware, getAllOrders);

module.exports = orderRouter;
