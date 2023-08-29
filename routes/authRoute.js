import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController,
  updateUserRoleController,
  testcon,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

// Router Object
const router = express.Router();

// Routing
// POST || Register
router.post("/register", registerController);

// POST || Login
router.post("/login", loginController);

// Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// Protected User Route Auth || GET
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin Route Auth || GET
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update Profile || PUT
router.put("/update-profile", requireSignin, updateProfileController);

// Get All Users || GET
router.get("/get-all-users", requireSignin, isAdmin, getAllUsersController);

// Update User Role || PUT
router.put(
  "/update-role/:userId",
  requireSignin,
  isAdmin,
  updateUserRoleController
);

// Order Routes ******************************************************
// Get Order || GET
router.get("/orders", requireSignin, getOrdersController);

// Get All Orders || GET
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);

// Update Orders Status || PUT
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);

// Test || GET
router.get("/test", requireSignin, isAdmin, testcon);

export default router;
