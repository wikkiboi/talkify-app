import { NextFunction, Request, Response } from "express";

export default async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  console.log("Get user");
}
