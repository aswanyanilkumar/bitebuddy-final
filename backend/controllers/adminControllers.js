//controllers/adminControllers.js
const adminModel = require("../models/adminModel");
const bcrypt = require('bcryptjs');
const createToken = require("../utilities/generateTokens");

// Admin Signup
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminModel({ name, email, password: hashedPassword, role: 'admin' });
        const savedAdmin = await newAdmin.save();

        return res.status(201).json({ message: "Admin account created", savedAdmin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: "Admin not found" });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = createToken(admin._id, 'admin');
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Admin Profile Update
const updateAdmin = async (req, res) => {
    try {
        const adminId = req.user;  // From the auth middleware (jwt token)
        const updatedAdmin = await adminModel.findByIdAndUpdate(adminId, req.body, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        return res.status(200).json({ message: "Admin profile updated", updatedAdmin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const deletedAdmin = await adminModel.findByIdAndDelete(adminId);

        if (!deletedAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        return res.status(200).json({ message: "Admin deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { registerAdmin, loginAdmin, updateAdmin, deleteAdmin };
