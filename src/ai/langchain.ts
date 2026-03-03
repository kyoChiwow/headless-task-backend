/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { GoogleGenAI } from "@google/genai";
import { envVars } from "../config/env";

const ai = new GoogleGenAI({
  apiKey: envVars.GEMINI_API_KEY,
});

interface AIResponse {
  category: string;
  priority: string;
  sentiment: string;
  team: string;
}

export const analyzeFeedback = async (
  feedbackText: string
): Promise<AIResponse> => {
  const prompt = `
You are an AI system that classifies user feedback.

Extract:
- category (bug, feature request, complaint, general)
- priority (low, medium, high)
- sentiment (positive, neutral, negative)
- team (frontend, backend, support, sales)

Return ONLY valid JSON.

Example Output:
{
  "category": "bug",
  "priority": "high",
  "sentiment": "negative",
  "team": "frontend"
}

Feedback:
"${feedbackText}"
`;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });

  const text = response.text;

  try {
    if (!text) {
      throw new Error("Empty AI response");
    }

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("AI JSON parse failed:", text);

    return {
      category: "general",
      priority: "low",
      sentiment: "neutral",
      team: "support",
    };
  }
};