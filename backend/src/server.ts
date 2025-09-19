import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { healthCheckRouter } from "@/router/healthCheck.router";
import { userRouter } from "@/router/user.router";
import errorHandler from "@/common/middleware/errorHandler";
import { addRequestId, captureResponseBody, requestFileLogger, requestConsoleLogger } from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

const app: Express = express();
// Allow CORS from any origin (must be first middleware)
app.use(cors({ origin: '*', credentials: false }));

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Request logging: minimal to console, full to file
app.use(...[addRequestId, captureResponseBody, requestFileLogger, requestConsoleLogger]);

// Routes
app.use(env.BASE_PATH + "/health-check", healthCheckRouter);
app.use(env.BASE_PATH + "/users", userRouter);

// Error handlers
app.use(errorHandler());

export { app };