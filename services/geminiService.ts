
import { GoogleGenAI } from "@google/genai";
import { DailyLog } from '../types';

export const getTreatmentInsight = async (logs: DailyLog[]) => {
  try {
    // Initialize inside the function to ensure up-to-date API key access
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const logSummary = logs.map(l => `Day ${l.day}: BP ${l.vitals.bp}, Pulse ${l.vitals.pulse}, Notes: ${l.notes}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following patient treatment progress and provide a professional medical insight recommendation: \n\n${logSummary}`,
      config: {
        systemInstruction: "You are a senior medical consultant. Provide concise, professional healthcare insights based on patient logs. Do not give direct medical diagnosis, but trends and advice.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Insights are currently unavailable. Please consult your physician.";
  }
};
