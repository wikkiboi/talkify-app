import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import getUserById from "../utils/db/user/getUserById";
import getUserEmail from "../utils/db/user/getUserEmail";

export default async function socketAuth(
  socket: Socket,
  next: (err?: Error) => void
) {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      next(new Error("Authentication error: No token provided"));
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "abc123");

    const user = await getUserEmail(decoded?.user.email);

    if (!user) {
      next(new Error("Authentication error: User not found"));
    } else {
      socket.user = user;
      // socket.user.id = user.id;
    }

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
}
