// Authentication logic for user, making sure that the user is logged in before they perform any actions
import { Request } from "express";
import { expressjwt as jwt } from "express-jwt";

const JWT_SECRET = "abc123"; // TODO: Move to .env when implemented

export function getTokenInHeader(req: Request): string | undefined {
  // Get token from Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return;
  }

  const token = authHeader.split(" ")[1];
  return token;
}

export const authenticate = jwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET || JWT_SECRET,
  getToken: getTokenInHeader,
});
