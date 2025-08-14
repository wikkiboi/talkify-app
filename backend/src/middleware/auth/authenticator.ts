import { Request } from "express";
import { expressjwt as jwt } from "express-jwt";

const JWT_SECRET = process.env.JWT_SECRET ?? "abc123";

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
  secret: JWT_SECRET,
  getToken: getTokenInHeader,
});
