// config/stripe.js
console.log(process.env.STRIPE_SECRET_KEY);
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Secret key from your Stripe dashboard

module.exports = stripe;
