import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import {
  authRouter,
  spaceRouter,
  channelRouter,
  userRouter,
  friendRouter,
  dmRouter,
} from "./routes/api";
import { initializeSocket } from "./socket/socket";
import { createServer } from "http";
import authErrorHandler from "./middleware/errorHandling/authError";
import generalErrorHandler from "./middleware/errorHandling/generalError";

const app: Express = express();
const server = createServer(app);

const io = initializeSocket(server);
app.set("io", io);

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/space", spaceRouter);
app.use("/api/channel", channelRouter);
app.use("/api/friend", friendRouter);
app.use("/api/dm", dmRouter);
app.use("/api/user", userRouter);

app.use(authErrorHandler);
app.use(generalErrorHandler);

export { server };
