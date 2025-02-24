import { NextFunction, Request, Response } from "express";

export default async function channelMsg(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { channelId } = req.params;
  const { user, text } = req.body;

  try {
  } catch (error) {}
}
