import { GoogleGenAI } from "@google/genai";
import { CSV_CONTEXT } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const generateResponse = async (userMessage: string): Promise<string> => {
  try {
    const client = getClient();
    
    // System instruction to act as the Bus Assistant
    const systemInstruction = `
      You are 'YatraBot', a helpful bus transport assistant for the Kottayam-Ernakulam region in Kerala, India.
      
      CONTEXT DATA:
      ${CSV_CONTEXT}
      
      RULES:
      1. Answer questions based ONLY on the provided Context Data. If the info isn't there, suggest checking the official counter.
      2. If the user asks in Malayalam (or uses Manglish), reply in Malayalam.
      3. If the user asks in English, reply in English.
      4. Be concise and helpful. Format times clearly (e.g., 10:30 AM).
      5. Do not invent new buses or times.
      
      CURRENT TIME: ${new Date().toLocaleTimeString()}
    `;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Keep it factual
      }
    });

    return response.text || "Sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the schedule database. Please try again.";
  }
};
