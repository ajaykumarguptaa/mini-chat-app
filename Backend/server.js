import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectdb } from "./src/config/db.js";

import { initSocket } from "./src/sockets/index.js";
import AuthRouter from "./routes/auth.routes.js";
import channelRouter from "./routes/channel.routes.js";
import messageRouter from "./routes/messsage.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ 1. Allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://chatapp-frontend-sa8t.onrender.com",
];

// ✅ 2. HTTP CORS (for REST APIs)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman, server-side, etc.

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Preflight
app.options("*", cors());

// ---------------- ROUTES ----------------
app.get("/", (req, res) => {
  res.send("Team Chat API running");
});

app.use("/api/auth", AuthRouter);
app.use("/api/channels", channelRouter);
app.use("/api/messages", messageRouter);

// ---------------- SOCKET.IO ----------------
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      console.log("❌ Socket CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS (socket)"));
    },
    credentials: true,
  },
});

initSocket(io);

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

connectdb()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log("✅ Allowed origins:", allowedOrigins);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
