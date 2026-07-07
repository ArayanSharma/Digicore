import Footer from "../Model/Footer.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// there's only ever one footer doc, create it with defaults if it's missing
export const getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = await Footer.create({});
    }

    res.status(200).json({
      success: true,
      footer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// upsert since there's only one footer doc
export const updateFooter = async (req, res) => {
  try {
    const {
      logo,
      companyName,
      address,
      phone,
      email,
      socialLinks,
      linkColumns,
      copyrightText,
    } = req.body;

    const footer = await Footer.findOneAndUpdate(
      {},
      {
        logo,
        companyName,
        address,
        phone,
        email,
        socialLinks,
        linkColumns,
        copyrightText,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      footer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const uploadFooterLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "footer-logos",
    });

    res.status(200).json({
      success: true,
      path: result.url,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};