import express from "express";
import { uploadSingle } from "../middleware/upload.js";
import {
  uploadMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from "../Controller/mediaController.js";

const router = express.Router();

router.post("/", uploadSingle, uploadMedia);

// query params: ?type=image|video&page=1&limit=20
router.get("/", getAllMedia);

router.get("/:id", getMediaById);
router.put("/:id", uploadSingle, updateMedia);
router.delete("/:id", deleteMedia);

export default router;
