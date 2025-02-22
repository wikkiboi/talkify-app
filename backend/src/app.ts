import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { authRouter, spaceRouter, channelRouter } from "./routes/api";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/space", spaceRouter);
app.use("/api/channel", channelRouter);

app.get("/", (req, res) => {
  console.log("Hi");
  res.send("hello");
});
export default app;
