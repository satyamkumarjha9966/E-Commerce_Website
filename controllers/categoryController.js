import slugify from "slugify";
import categoryModel from "../model/categoryModel.js";

// Create Category
export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name) {
      return res.status(401).send({
        message: "Name is Required",
      });
    }

    // Check Category in DB
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category Already Exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log("Error in Create Category > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category",
      error,
    });
  }
};

// Update Category
export const UpdateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Validation
    if (!name) {
      return res.status(401).send({
        message: "Name is Required",
      });
    }

    // Check Category in DB
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Does Not Find Category With This Name, Pls Craete New One",
      });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log("Error in Update Category > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category",
      error,
    });
  }
};

// Get All Category
export const CategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    res.status(200).send({
      success: true,
      message: "All Category List",
      category,
    });
  } catch (error) {
    console.log("Error in Find Category > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Find Category",
      error,
    });
  }
};

// Get Single Category
export const SingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    // Validation
    if (!slug) {
      return res.status(401).send({
        message: "Please Enter Category Name",
      });
    }

    const category = await categoryModel.findOne({ slug });

    // Check Category in DB
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Does Not Find Category With This Name, Pls Craete New One",
      });
    }

    res.status(200).send({
      success: true,
      message: "Here is Category",
      category,
    });
  } catch (error) {
    console.log("Error in Find Single Category > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Find Single Category",
      error,
    });
  }
};

// Delete Category
export const DeleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      category,
    });
  } catch (error) {
    console.log("Error in Delete Category > " + error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Category",
      error,
    });
  }
};
