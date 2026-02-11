
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLoveMessage = async (mood?: string): Promise<string> => {
  try {
    const prompt = mood 
      ? `Write a very short, poetic, and romantic message in Arabic (Lebanese/Egyptian/Modern Standard) for a fiancée. The mood is: ${mood}. Maximum 2 sentences.`
      : `Write a short, heart-touching romantic quote in Arabic (Modern Standard) for a digital gift website. Maximum 1 sentence.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a poetic, romantic lover who writes deeply emotional messages in Arabic. Keep it respectful, sweet, and intimate.",
      },
    });

    return response.text || "أنتِ الحب الذي لا ينتهي.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "أحبك في كل حالاتك.";
  }
};
