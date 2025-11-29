import Resume from "../models/Resume.js";
import { htmlToPdfBuffer } from "../services/pdfService.js";
import User from "../models/User.js";
import path from "path";
import fs from "fs";

export async function createOrUpdateResume(req, res) {
  try {
    const userId = req.user.id;
    const data = req.body;

    let resume = await Resume.findOne({ userId });
    if (!resume) {
      resume = await Resume.create({ userId, ...data, publicUrlSlug: data.publicUrlSlug || req.user.id });
    } else {
      Object.assign(resume, data);
      await resume.save();
    }
    res.json(resume);
  } catch (err) {
    console.error("Resume save error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getResume(req, res) {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    if (!resume) return res.status(404).json({ message: "Not found" });
    res.json(resume);
  } catch (err) {
    console.error("Get resume error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// public access by slug
export async function getResumePublic(req, res) {
  try {
    const { slug } = req.params;
    const resume = await Resume.findOne({ publicUrlSlug: slug }).populate("userId", "username");
    if (!resume) return res.status(404).send("Not found");
    // simple HTML rendering for public portfolio
    const html = `<html><body><h1>${resume.personal?.fullName || resume.userId.username}</h1>
      <p>${resume.summary}</p></body></html>`;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function exportPdf(req, res) {
  try {
    const resume = await Resume.findOne({ userId: req.user.id }).populate("userId", "username");
    if (!resume) return res.status(404).json({ message: "Not found" });

    // render a simple HTML template; you can replace with fancy template
    const html = `
      <html>
      <head><style>body{font-family:Arial;padding:20px}</style></head>
      <body>
        <h1>${resume.personal?.fullName || resume.userId.username}</h1>
        <h3>${resume.personal?.jobTitle || ""}</h3>
        <p>${resume.summary || ""}</p>
      </body>
      </html>
    `;

    const pdfBuffer = await htmlToPdfBuffer(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${(resume.personal?.fullName || "resume")}.pdf"`,
      "Content-Length": pdfBuffer.length
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Export PDF error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
