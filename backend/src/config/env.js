import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV || "development",

  ollamaBaseUrl:
    process.env.OLLAMA_BASE_URL ||
    "http://localhost:11434",

  chromaUrl:
    process.env.CHROMA_URL ||
    "http://localhost:8000",

  logLevel: process.env.LOG_LEVEL || "info",
};