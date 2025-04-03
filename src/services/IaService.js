import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config();

const geminiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(geminiKey);


const model = genAI.getGenerativeModel({ 
  model: "gemini-pro"
});

const gemini = {
  prompt: async (prompt) => {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  }
};

export default gemini;