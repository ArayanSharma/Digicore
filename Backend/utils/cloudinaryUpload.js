import cloudinary from "../Config/cloudinary.js";
import streamifier from "streamifier";

const DEFAULT_FOLDER = "digital-markitors";

export const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: DEFAULT_FOLDER,
      resource_type: "auto",
      quality: "auto",
      fetch_format: "auto",
      ...options,
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
          format: result.format,
          bytes: result.bytes,
          width: result.width || null,
          height: result.height || null,
          duration: result.duration || null,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) {
    throw new Error("public_id is required to delete from Cloudinary");
  }

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });

  return result;
};

export const updateOnCloudinary = async (
  oldPublicId,
  oldResourceType,
  newFileBuffer,
  options = {}
) => {
  // don't block on the delete failing — the old file may already be gone
  try {
    await deleteFromCloudinary(oldPublicId, oldResourceType);
  } catch (err) {
    console.warn(
      `Warning: Failed to delete old Cloudinary asset ${oldPublicId}:`,
      err.message
    );
  }

  return uploadToCloudinary(newFileBuffer, options);
};
