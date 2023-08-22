import express from "express";
import {
  CreateProductController,
  DeleteProductController,
  UpdateProductController,
  GetProductController,
  GetSingleProductController,
  GetProductPhotoController,
} from "./../controllers/productController.js";
import { isAdmin, requireSignin } from "./../middleware/authMiddleware.js";

// For image Upload we use express-formidable package because imge data come in "form-data"
import formidable from "express-formidable";

const router = express.Router();

// Routes
// POST || Create Product
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  CreateProductController
);

// GET || Get All Product
router.get("/get-product", GetProductController);

// GET || Get Single Product
router.get("/get-product/:slug", GetSingleProductController);

// GET || Get Product Photo
router.get("/product-photo/:pid", GetProductPhotoController);

// PUT || Update Product
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  UpdateProductController
);

// DELETE || Delete Product
router.delete(
  "/delete-product/:pid",
  requireSignin,
  isAdmin,
  DeleteProductController
);

export default router;
