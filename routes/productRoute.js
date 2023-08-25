import express from "express";
import {
  CreateProductController,
  DeleteProductController,
  UpdateProductController,
  GetProductController,
  GetSingleProductController,
  GetProductPhotoController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  similarProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentsController,
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

// POST || Filter Product
router.post("/product-filter", productFilterController);

// GET || Product Count
router.get("/product-count", productCountController);

// GET || Product Per Page
router.get("/product-list/:page", productListController);

// GET || Search Product
router.get("/search-product/:keyword", searchProductController);

// GET || Similar Product
router.get("/similar-product/:pid/:cid", similarProductController);

// GET || Category Wise Product
router.get("/product-category/:slug", productCategoryController);

// Payments Routes
// Braintree Token Verify
router.get("/braintree/token", braintreeTokenController);

// Payment Verify
router.post("/braintree/payment", requireSignin, braintreePaymentsController);

export default router;
