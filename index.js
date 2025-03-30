import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './src/routers/ProductRouter.js';
import userRouter from './src/routers/UserRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar:', err));

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err.message);
});


app.use('/api', productRouter);
app.use('/api', userRouter);
// A GENTE TERMINAR DPS

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
