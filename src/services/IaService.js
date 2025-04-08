import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs'; 
dotenv.config();

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
  },

  longContext: async (prompt, pdfPath) => { // Corrigido: `pdfpath` para `pdfPath` (parâmetro)

    const instructions = 
    `You are a highly skilled travel agent with a passion for crafting unforgettable experiences. Your expertise lies in thoroughly analyzing destination information and transforming it into personalized, engaging, and inspiring travel recommendations.

Task Description:
You will be provided with detailed information about a travel destination, along with a client query. Your task is to:

1. Thoroughly Analyze: Read and understand the full content about the destination, identifying attractions, activities, cultural highlights, and any relevant details related to the query.
2. Synthesize Information: Extract and integrate the most relevant information into a clear, engaging, and inspiring response.
3. Support Your Recommendations: Where applicable, reference specific places, local events, itineraries, or dining options to substantiate your suggestions.
4. Highlight Ambiguities: If the document does not fully address the query or leaves room for interpretation, clearly indicate any limitations or uncertainties.

Tone & Style:
Use a friendly, enthusiastic, and informative tone, suitable for clients seeking memorable travel experiences. Your response should be clear, exciting, and directly focused on the client’s query.

Instructions:
Query: ${prompt}
Document: [Full destination text provided]
Objective: Provide the destination name and a final recommendation based solely on the content of the document, meeting all the task description requirements.

Language: Portuguese PT - Brazilian Portuguese.
`;

    const pdf =  await  fs.readFileSync(pdfPath); // Corrigido: readySyncFile -> readFileSync
    const pdfBase64 =  await pdf.toString('base64');

    const p = {
      contents: [
        {
          parts: [
            { text: instructions },
            {
              inline_data: { mime_type: "application/pdf", data: pdfBase64 }
            }
          ]
        }
      ]
    };

    const result = await model.generateContent(p, { timeout: 30000 });
    return result.response;
  }
};

export default gemini;
