import mongoose from "mongoose";
import Category from "../Model/Category.js";
import Service from "../Model/Service.js";

export const createCategory = async (req, res) => {
  try {
    const count = await Category.countDocuments();
    const category = await Category.create({
      ...req.body,
      order: req.body.order ?? count,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A category with this slug already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};

    if (active !== undefined) {
      filter.isActive = active === "true";
    }

    const categories = await Category.find(filter).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// id can be the Mongo _id or the slug here
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = mongoose.Types.ObjectId.isValid(id)
      ? await Category.findById(id)
      : await Category.findOne({ slug: id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A category with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const serviceCount = await Service.countDocuments({ category: category._id });
    if (serviceCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete: ${serviceCount} service(s) still belong to this category`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
