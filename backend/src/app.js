import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
const FRONT = process.env.FRONTEND_URL || "*";
app.use(cors({ origin: FRONT, credentials: true }));

// static uploads
import path from "path";
app.use("/uploads", express.static(path.join(process.cwd(), "backend", "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

export default app;
