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

    // Updating Product Data
    const product = await productModel.findByIdAndUpdate(
      pid,
      {
        ...req.fields,
      },
      { new: true }
    );

    // Updating Slug
    if (name) {
      product.slug = slugify(name);
    }

    // Updating Photo Data
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Saving Updated Data
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

// Filter Product
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    const args = {};

    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error in Fetch Product on Filter > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Fetch Product on Filter",
      error,
    });
  }
};

// Total Product Count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log("Error in Product Count > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Product Count",
      error,
    });
  }
};

// Product List Based On Page (Load More Product)
export const productListController = async (req, res) => {
  try {
    const page = req.params.page ? req.params.page : 1;
    const perPage = 5;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error in Product List > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Product List",
      error,
    });
  }
};

// Search Product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    res.json(results);
  } catch (error) {
    console.log("Error in Product Search > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Product Search",
      error,
    });
  }
};

// Similar Product
export const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(5)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error in Fetching Similar Product > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Similar Product",
      error,
    });
  }
};
