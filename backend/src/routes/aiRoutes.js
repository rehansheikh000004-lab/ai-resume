import express from "express";
import { generateSummary } from "../controllers/aiController.js";
const router = express.Router();
router.post("/summary", generateSummary);
export default router;
