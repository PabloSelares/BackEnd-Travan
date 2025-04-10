import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './src/routers/ProductRouter.js';
import userRouter from './src/routers/UserRouter.js';
import compraRouter from './src/routers/CompraRouter.js';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws'; 
import middleware from './authMiddleware.js';
import AiService from './src/services/IaService.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './configs/swaggerConfig.js';

dotenv.config();

const app = express();
const server = http.createServer(app); 
const ws = new WebSocketServer({ server });

const clients = new Set();

ws.on('connection', (client) => { 
  clients.add(client);
  console.log("🟢 Cliente acabou de se conectar");

  client.on("message", async (message) => {
    try {
      const msg = message.toString();
      console.log(`📩 Mensagem recebida: ${msg}`);

      const response = await AiService.longContext(msg, './src/context/pabloselares.pdf');

      const responseObject = {
        text: response.text(),
        sentBy: 'Gemini'
      };

      // Enviar a resposta como string JSON
      client.send(JSON.stringify(responseObject));
    } catch (error) {
      console.error("❌ Erro ao processar mensagem:", error.message);
    }
  });

  client.on("close", () => {
    clients.delete(client);
    console.log("🔴 Cliente desconectado");
  });
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(middleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', productRouter);
app.use('/api', compraRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
