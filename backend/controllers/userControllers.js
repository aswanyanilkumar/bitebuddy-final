//controllers/userController.js
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const createToken = require("../utilities/generateTokens");

const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword, "hashedPassword");

        const newUser = new userModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        return res.status(201).json({ message: "Account created", newUser });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ error: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, userExist.password);
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: "Not a valid password" });
        }

        const userObject = userExist.toObject();
        delete userObject.password;

        const token = createToken(userExist._id);

        return res.status(200).json({ message: "Login successful", user: userObject, token });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

const profile = async(req, res) => {
    try {
        const userId = req.user;
        const user = await userModel.findById(userId).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

const updateUser = async(req, res) => {
    try {
        const userId = req.user;
        const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json({ message: "User updated", updatedUser });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

const deleteUser = async(req, res) => {
    try {
        const { userId } = req.params;
        await userModel.findByIdAndDelete(userId);
        return res.status(200).json("User deleted");
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

module.exports = { register, login, updateUser, deleteUser };
