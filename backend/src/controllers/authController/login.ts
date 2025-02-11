import { NextFunction, Request, Response } from "express";
import getUserEmail from "../../utils/db/user/getUserEmail";
import getUser from "../../utils/db/user/getUser";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { usernameOrEmail, password } = req.body;

    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);

    const user = await (isEmail
      ? getUserEmail(usernameOrEmail)
      : getUser(usernameOrEmail));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {}
}
