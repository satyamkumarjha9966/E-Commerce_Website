import express from "express";
import { isAdmin, requireSignin } from "./../middleware/authMiddleware.js";
import {
  CreateCategoryController,
  UpdateCategoryController,
  CategoryController,
  SingleCategoryController,
  DeleteCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

// Routes
// POST || Create Category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  CreateCategoryController
);

// PUT || Update Category
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  UpdateCategoryController
);

// GET || Get All Category
router.get("/get-category", CategoryController);

// GET || Get Single Category
router.get("/single-category/:slug", SingleCategoryController);

// DELETE || Delete Category
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  DeleteCategoryController
);

export default router;
