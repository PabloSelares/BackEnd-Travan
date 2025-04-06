import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// Corrigido: nome da variável de ambiente
const geminiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(geminiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

const gemini = {
  prompt: async (inputPrompt) => {
    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: inputPrompt }]
        }
      ]
    });

    const response = result.response;
    const text = await response.text();
    return text;
  }
};

export default gemini;
