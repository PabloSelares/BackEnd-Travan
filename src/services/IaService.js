import dotenv from 'dotenv';
dotenv.config();

const geminiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(geminiKey)

const model = genAI.getGenerativeAiModel('geminiKey')({
    model: 'gemini-2.0-flash-thinking-expo-01-21'

})

const gemini = {
    prompt: async (prompt) => {
        const p = {
            "content": [
                {
                    "parts": [
                        { "text": prompt }
                    ]
                }
            ]
        }
        const result= await model.generateContent(p,{timeout: 10000})
          return result.response
    }
}