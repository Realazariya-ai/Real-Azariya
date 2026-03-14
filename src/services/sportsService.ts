import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getLiveFootballUpdates() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Provide a summary of current live football (soccer) matches happening right now globally. Include scores, teams, and match minute if available. Format as a clean list for a luxury sports lounge app.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching live football updates:", error);
    return "The live sports feed is currently undergoing maintenance. Please check back shortly for exclusive updates.";
  }
}
