import axios from "axios";

export async function generateSummaryFromAI(text, openAiKey) {
  // If user hasn't set a key or you want to use your own server-side key, plug it here.
  if (!openAiKey) {
    // Simple fallback: do basic rewording without external API
    return `Professional Summary (auto): ${text.slice(0, 200)}${text.length > 200 ? "..." : ""}`;
  }

  // Example using OpenAI Chat Completions (replace with actual API shape if different)
  const res = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a professional resume writer." },
      { role: "user", content: `Rewrite this into a strong resume summary in 2-3 lines:\n\n${text}` }
    ],
    max_tokens: 200
  }, {
    headers: { Authorization: `Bearer ${openAiKey}` }
  });

  const out = res.data?.choices?.[0]?.message?.content;
  return out || `Professional Summary (auto): ${text.slice(0,200)}`;
}
