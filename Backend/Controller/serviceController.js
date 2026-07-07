import mongoose from "mongoose";
import Service from "../Model/Service.js";

export const createService = async (req, res) => {
  try {
    const { category } = req.body;
    const count = await Service.countDocuments({ category });
    const service = await Service.create({
      ...req.body,
      order: req.body.order ?? count,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A service with this slug already exists",
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

// optional query params: category=<slug or id>, active=true
export const getServices = async (req, res) => {
  try {
    const { category, active } = req.query;
    const filter = {};

    if (active !== undefined) {
      filter.isActive = active === "true";
    }

    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
      } else {
        const Category = mongoose.model("Category");
        const categoryDoc = await Category.findOne({ slug: category });
        filter.category = categoryDoc ? categoryDoc._id : null;
      }
    }

    const services = await Service.find(filter)
      .populate("category", "name slug")
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
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
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = mongoose.Types.ObjectId.isValid(id)
      ? await Service.findById(id).populate("category", "name slug")
      : await Service.findOne({ slug: id }).populate("category", "name slug");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A service with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
