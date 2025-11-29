import express from "express";
import auth from "../middleware/auth.js";
import { createOrUpdateResume, getResume, exportPdf, getResumePublic } from "../controllers/resumeController.js";
import { uploadSingle } from "../middleware/upload.js";

const router = express.Router();
router.get("/public/:slug", getResumePublic);
router.use(auth);
router.get("/", getResume);
router.post("/", createOrUpdateResume);
router.post("/upload-profile", uploadSingle, async (req, res) => {
  // return path
  if (!req.file) return res.status(400).json({ message: "No file" });
  const url = `${process.env.BACKEND_URL || ""}/uploads/${req.file.filename}`;
  res.json({ url });
});
router.get("/export/pdf", exportPdf);
export default router;
