import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { authRouter, spaceRouter, channelRouter } from "./routes/api";
import { initializeSocket } from "./socket/socket";
import { createServer } from "http";
import userRouter from "./routes/api/user";
const app: Express = express();
const server = createServer(app);

const io = initializeSocket(server);
app.set("io", io);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/space", spaceRouter);
app.use("/api/channel", channelRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  console.log("Hi");
  res.send("hello");
});

export { server };
