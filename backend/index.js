//index.js 
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/dbConnection");
const path = require("path");

const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes"); 
const restaurantRouter = require("./routes/restaurantRoutes");
const foodItemRoutes = require("./routes/foodItemRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();

app.get("/",(req,res) => {
    res.json("server started");
})

connectDB();
//middleware
app.use(cors({ origin:[
    'http://localhost:5179',                 // for local dev
    'https://bitebuddy-final.vercel.app',    // for deployed frontend
  ], }));
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin", adminRouter);
app.use("/restaurant", restaurantRouter);
app.use("/food", foodItemRoutes);
app.use("/orders", orderRouter);
app.use("/cart", cartRoutes);
app.use("/review", reviewRoutes);
app.use("/payment", paymentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(process.env.PORT, () => {
    console.log(`Server starts on port ${process.env.PORT}`);
})



  