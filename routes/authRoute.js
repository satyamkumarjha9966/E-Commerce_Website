import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

// Router Object
const router = express.Router();

// Routing
// POST || Register
router.post("/register", registerController);

// POST || Login
router.post("/login", loginController);

export default router;
