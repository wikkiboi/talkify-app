import { io } from "socket.io-client";

const URL = "http://localhost:3000";

const token = localStorage.getItem("token");

const socket = io(URL, {
  auth: { token },
  reconnection: true,
});

export default socket;
