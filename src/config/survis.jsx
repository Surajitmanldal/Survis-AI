import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

async function main(input) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: input,
    });

    const text = result.text;
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating response";
  }
}

export default main;


