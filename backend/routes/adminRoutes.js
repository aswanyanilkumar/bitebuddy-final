//routes/adminRoutes.js
const { registerAdmin, loginAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const adminRouter = require('express').Router();
adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.patch("/update", authMiddleware, updateAdmin); 
adminRouter.delete("/delete-admin/:adminId", authMiddleware, deleteAdmin); 

module.exports = adminRouter;

