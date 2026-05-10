import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes.js";

import chatRoutes from "./routes/chat.routes.js";

import {
  errorMiddleware,
} from "./middleware/error.middleware.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.use("/health", healthRoutes);

app.use("/chat", chatRoutes);

app.use(errorMiddleware);

export default app;