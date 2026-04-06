import { classifyWithLLM } from "../services/llmService.js";

export const classifyEmail = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Email text is required" });
    }

    const result = await classifyWithLLM(text);

    // fallback logic
    if (result.confidence < 0.2) {
      return res.json({
        category: "Human Review Required",
        confidence: result.confidence,
        data: {}
      });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};