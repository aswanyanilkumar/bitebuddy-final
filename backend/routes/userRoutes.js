//routes//userRoutes.js
const { register, login, updateUser, deleteUser } = require('../controllers/userControllers'); // Added missing imports
const authMiddleware = require('../middlewares/authMiddleware');
const userRouter = require('express').Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/update", authMiddleware, updateUser);
userRouter.delete("/delete-user/:userId", deleteUser); 

module.exports = userRouter;

