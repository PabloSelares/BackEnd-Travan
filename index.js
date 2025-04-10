import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './src/routers/ProductRouter.js';
import userRouter from './src/routers/UserRouter.js';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws'; 
import middleware from './authMiddleware.js';
dotenv.config();

const app = express();
const server = http.createServer(app); 
const ws = new WebSocketServer({ server });

const clients = new Set();

ws.on('connection', (client) => { 
  clients.add(client);
  console.log("Cliente acabou de se conectar");

  client.on("message", (message) => {
    const msg = message.toString()
    for (let c of clients) {
      if (c.readyState === WebSocket.OPEN) { 
        if (msg && Object.keys(msg).length > 0) {
          c.send(msg);
        } else {
          console.warn("Tentativa de enviar uma mensagem vazia!");
        } 
      }
    }
  });

  client.on('close', () => {
    clients.delete(client);
    console.log("Cliente removido do socket");
  });
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// mongoose.connection.on("connected", () => {
//   console.log();
// });

// mongoose.connection.on("error", (err) => {
//   console.error("❌ MongoDB connection error:", err.message);
// });

app.use(middleware);
app.use('/api', productRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT 

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
