import cors from "cors";
import express from "express";
import cookieparser from "cookie-parser";
import errorHandler from "./Middlewares/errorhandler.middleware";

// EXPRESS APP CREATION
const app = express();

// USING CORS MIDDLEWARE
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieparser());

// Router imports
import healthcheckRouter from "./Routes/HealthCheck";

// Routes
app.use("/api/v1/healthcheck", healthcheckRouter);

// ERROR HANDLER
app.use(errorHandler);

export { app };
