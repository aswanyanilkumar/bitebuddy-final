// src/pages/Payment.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Payment = () => {
  const { cartItems, clearCart, coupon } = useCart();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const deliveryAddress = location.state?.deliveryAddress || "";

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [loading, setLoading] = useState(false);

  const rawAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = coupon
    ? typeof coupon.value === "number"
      ? coupon.value < 1
        ? rawAmount * coupon.value
        : coupon.value
      : 0
    : 0;

  const totalAmount = rawAmount - discount;

  const handlePayment = async () => {
    if (!token) return alert("You must be logged in");
    if (!cartItems.length) return alert("Cart is empty.");
    if (!totalAmount || isNaN(totalAmount)) return alert("Invalid total amount.");
    if (!deliveryAddress.trim()) return alert("Delivery address is required.");

    try {
      setLoading(true);

      const paymentRes = await axios.post(
        "http://localhost:3001/payment/process",
        { amount: totalAmount, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!paymentRes.data.success) return alert("Payment failed.");

      const restaurantId = cartItems[0]?.restaurant;
      if (!restaurantId) return alert("Restaurant not found in cart items.");

      const orderItems = cartItems.map((item) => ({
        foodItem: item._id,
        quantity: item.quantity,
      }));

      const orderRes = await axios.post(
        "http://localhost:3001/orders/place",
        {
          restaurant: restaurantId,
          items: orderItems,
          deliveryAddress, // pass address here!
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      clearCart();
      navigate("/payment-success");
    } catch (err) {
      console.error("Payment Error:", err?.response?.data || err.message);
      alert(err?.response?.data?.error || "Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">Select Payment Method:</label>
        <select
          className="w-full border p-2 rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Credit Card</option>
          <option value="upi">UPI</option>
          <option value="net_banking">Net Banking</option>
        </select>
      </div>

      <p className="text-lg mb-1">Subtotal: ₹{rawAmount.toFixed(2)}</p>
      {coupon && (
        <p className="text-green-600 mb-1">
          Coupon <strong>{coupon.code}</strong> applied (-₹{discount.toFixed(2)})
        </p>
      )}
      <p className="text-xl font-semibold mb-6">Total: ₹{totalAmount.toFixed(2)}</p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </div>
  );
};

export default Payment;
