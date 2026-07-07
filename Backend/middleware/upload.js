import multer from "multer";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
];

const ALLOWED_DOC_TYPES = [
  "application/pdf",
];

const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_DOC_TYPES];

// 100 MB to accommodate video uploads; per-type limits are enforced in the controller
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error(
      `Unsupported file type: ${file.mimetype}. ` +
        `Allowed types: ${ALLOWED_TYPES.join(", ")}`
    );
    error.code = "UNSUPPORTED_FILE_TYPE";
    cb(error, false);
  }
};

// memory storage — buffers go straight to Cloudinary via streamifier, nothing hits disk
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export const uploadSingle = upload.single("file");
export const uploadMultiple = upload.array("files", 10);

export default upload;