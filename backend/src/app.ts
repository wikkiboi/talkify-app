import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import authRouter from "./routes/api/auth";

const app: Express = express();

// app.use(helmet());
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

export default app;
