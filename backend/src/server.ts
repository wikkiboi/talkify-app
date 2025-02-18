import { server, io } from "./socket";
import connectDB from "./config/connectDB";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
// Temporarily hard-coded JWT_SECRET for authentication, remove once .env is setup
const JWT_SECRET = "abc123";
connectDB();

server.listen(PORT, function () {
  console.log(`Server listening on PORT ${PORT}`);
});

process.on("SIGTERM", function () {
  console.log(`SIGTERM signal received: closing HTTP server`);
  process.exit();
});

process.on("SIGINT", function () {
  console.log(`SIGINT signal received: closing HTTP server`);
  process.exit();
});
