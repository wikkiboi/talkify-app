import { NextFunction, Request, Response } from "express";

export default async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Register user");
}
