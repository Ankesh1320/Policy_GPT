import dotenv from "dotenv";
dotenv.config();

export const env = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/gppsip",
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
};
