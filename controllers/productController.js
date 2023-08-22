import productModel from "../model/productModel.js";
import fs from "fs";
import slugify from "slugify";

// Create Product
export const CreateProductController = async (req, res) => {
  try {
    // Because of Using Express-Formidable
    // contains non-file fields
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    // contains files
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 10485760:
        return res
          .status(500)
          .send({ error: "Photo is Required and Should be less than 10 MB" });
    }

    // Storing Product Data
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    // Storing Photo Data
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Saving Data
    await product.save();

    // Sending Success Response
    res.status(200).send({
      success: true,
      message: "Product Successfully Created",
      product,
    });
  } catch (error) {
    console.log("Error in Create Product > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Create Product",
      error,
    });
  }
};

// Get All Product
export const GetProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Here Are All Products",
      TotalProductCount: products.length,
      products,
    });
  } catch (error) {
    console.log("Error in Get Product > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Get Product",
      error,
    });
  }
};

// Get Single Product
export const GetSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log("Error in Get Single Product > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Get Single Product",
      error,
    });
  }
};

// Get Product Photo
export const GetProductPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productModel.findById(pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log("Error in Get Product Photo > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Get Product Photo ",
      error,
    });
  }
};

// Update Product
export const UpdateProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    // contains non-file fields
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    // contains files
    const { photo } = req.files;

    // Validation
    switch (true) {
      case photo && photo.size > 10485760:
        return res
          .status(500)
          .send({ error: "Photo is Required and Should be less than 10 MB" });
    }

    // Storing Product Data
    const product = await productModel.findByIdAndUpdate(
      pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    // Storing Photo Data
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Saving Data
    await product.save();

    // Sending Success Response
    res.status(200).send({
      success: true,
      message: "Product Successfully Updated",
      product,
    });
  } catch (error) {
    console.log("Error in Update Product > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Update Product",
      error,
    });
  }
};

// Delete Product
export const DeleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productModel.findByIdAndDelete(pid);

    res.status(200).send({
      success: true,
      message: "Product Deleted SuccessFully",
      product,
    });
  } catch (error) {
    console.log("Error in Delete Product > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Product",
      error,
    });
  }
};
