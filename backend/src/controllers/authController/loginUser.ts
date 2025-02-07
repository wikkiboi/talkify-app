import { NextFunction, Request, Response } from "express";

export default async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Login user");
}
