import mongoose from "mongoose";
import Career from "../Model/Career.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// CREATE Career
export const createCareer = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;

    let resumeUrl = "";
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, {
        resource_type: "auto",
        quality: undefined,
        fetch_format: undefined,
      });
      resumeUrl = uploadResult.url;
    }

    const career = await Career.create({
      name,
      email,
      phone,
      position,
      resume: resumeUrl,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      career,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET All Careers
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: careers.length,
      careers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET Single Career
export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career application not found",
      });
    }

    res.status(200).json({
      success: true,
      career,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE Career
export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid career id",
      });
    }

    const career = await Career.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Career updated successfully",
      career,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE Career
export const deleteCareer = async (
  req,
  res
) => {
  try {
    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career application not found",
      });
    }

    await Career.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Career application deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};