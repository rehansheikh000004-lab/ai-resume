import { generateSummaryFromAI } from "../services/aiService.js";

export async function generateSummary(req, res) {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text required" });

    const openAiKey = process.env.OPENAI_KEY || null;
    const out = await generateSummaryFromAI(text, openAiKey);
    res.json({ summary: out });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ message: "AI generation failed" });
  }
}
