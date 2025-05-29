//src/pages/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, coupon, setCoupon } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleRemove = (id) => removeFromCart(id);
  const handleIncrement = (id) => updateQuantity(id, 1);
  const handleDecrement = (id) => updateQuantity(id, -1);

  const handleApplyCoupon = () => {
    const validCoupons = {
      BUDDY10: 0.10, // 10% off
      WELCOME50: 50, // ₹50 flat discount
    };

    if (validCoupons[couponInput]) {
      setCoupon({ code: couponInput, value: validCoupons[couponInput] });
      setCouponError('');
    } else {
      setCoupon(null);
      setCouponError('Invalid coupon code');
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = coupon
      ? typeof coupon.value === 'number'
        ? coupon.value < 1
          ? subtotal * coupon.value
          : coupon.value
        : 0
      : 0;
    return (subtotal - discount).toFixed(2);
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!deliveryAddress.trim()) {
      setAddressError("Delivery address is required.");
      return;
    }
    setAddressError('');
    navigate('/payment', { state: { deliveryAddress } });
  };

  return (
    <div className="min-h-screen bg-[#bbcac8] p-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl shadow-sm bg-white">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.category}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button onClick={() => handleDecrement(item._id)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 font-bold hover:bg-gray-300">-</button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button onClick={() => handleIncrement(item._id)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 font-bold hover:bg-gray-300">+</button>
              </div>

              <div className="text-right">
                <p className="text-lg text-green-600 font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemove(item._id)} className="mt-2 text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="mt-8 mb-6">
            <label className="block font-medium mb-2" htmlFor="deliveryAddress">
              Delivery Address
            </label>
            <textarea
              id="deliveryAddress"
              rows={3}
              className="w-full p-3 border rounded"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
            {addressError && <p className="text-red-500 mt-1">{addressError}</p>}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 text-right">
            <div className="mb-6 text-left">
              <h4 className="text-lg font-medium mb-2">Have a Coupon?</h4>
              <div className="flex gap-3 items-center">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="border p-2 rounded flex-1"
                  placeholder="Enter coupon code"
                />
                <button onClick={handleApplyCoupon} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Apply</button>
              </div>
              {couponError && <p className="text-red-500 mt-1">{couponError}</p>}
              {coupon && <p className="text-green-600 mt-1">Coupon <strong>{coupon.code}</strong> applied!</p>}
            </div>

            <p className="text-xl font-semibold text-gray-800 mb-4">Total: ₹{calculateTotal()}</p>
            <button onClick={handleProceedToPayment} className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-200">Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
