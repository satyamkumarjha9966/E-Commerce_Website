import express from "express";
import {
  registerController,
  loginController,
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

router.get("/test", requireSignin, isAdmin, testcon);

export default router;
