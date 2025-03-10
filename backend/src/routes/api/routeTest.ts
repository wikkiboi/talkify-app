import express from "express";
import { authRouter } from "../../routes/auth";
import { channelRouter } from "../../routes/channel";
import { friendRouter } from "../../routes/friend";
import { spaceRouter } from "../../routes/space";
import { userRouter } from "../../routes/user";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/channel", channelRouter);
app.use("/api/friend", friendRouter);
app.use("/api/space", spaceRouter);
app.use("/api/user", userRouter);

const PORT = 4000;
const server = app.listen(PORT, () => console.log(`Test server running on port ${PORT}`));

async function testAPI() {    //testing authentication routes
  try {
    let response = await fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", password: "testpassword" })
    });
    console.log("Register Status:", response.status);

    response = await fetch(`http://localhost:${PORT}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", password: "testpassword" })
    });
    console.log("Login Status:", response.status);

    //testing user routes
    response = await fetch(`http://localhost:${PORT}/api/user/me`);
    console.log("User Info Status:", response.status);

    response = await fetch(`http://localhost:${PORT}/api/space/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New Space" })
    });
    console.log("Create Space Status:", response.status);

  } catch (error) {
    console.error("Error testing API:", error);
  } finally {
    server.close(() => console.log("Test server closed"));
  }
}

testAPI();
