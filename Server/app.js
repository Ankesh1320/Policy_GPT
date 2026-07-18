import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import routes from "./src/routes/index.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());
if (env.nodeEnv !== "test") app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;