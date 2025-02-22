import { NextFunction, Request, Response } from "express";
import { createSpace } from "../../utils/db/space";

export default async function spaceCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;
  try {
    if (!name) {
      throw new Error("Please add a name for the Space");
    }

    const space = createSpace(name);

    res.status(201).json(space);
  } catch (error) {
    return next(error);
  }
}
