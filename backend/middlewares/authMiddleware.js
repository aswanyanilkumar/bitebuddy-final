//middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const adminModel = require('../models/adminModel');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const authToken = authHeader && authHeader.split(" ")[1];
        
        if (!authToken) return res.status(401).json({ status: false, message: "No auth token" });

        const decoded = jwt.verify(authToken, process.env.JWT_SECRETE_KEY);
        
        // Define the user variable based on role
        let user;
        if (decoded.role === 'admin') {
            user = await adminModel.findById(decoded.id); // Using findById to be consistent with user model
        } else {
            user = await userModel.findById(decoded.id); // Using findById to be consistent with user model
        }

        if (!user) return res.status(401).json({ status: false, message: "User not found" });

        req.user = { ...user._doc, role: decoded.role }; // Attach full user object, not just user ID
        
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ status: false, message: "Authentication failed" });
    }
};
