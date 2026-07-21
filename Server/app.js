import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import routes from "./src/routes/index.js";
import authRoutes from "./src/routes/authRoutes.js";
import eligibilityRoutes from "./src/routes/eligibilityRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());
if (env.nodeEnv !== "test") app.use(morgan("dev"));

// Kept from dev — explicit request logging, in addition to morgan above.
app.use((req, res, next) => {
  console.log(`[HTTP LOG] ${req.method} ${req.originalUrl || req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/eligibility", eligibilityRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;