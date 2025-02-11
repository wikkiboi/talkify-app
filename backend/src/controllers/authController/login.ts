import { NextFunction, Request, Response } from "express";
import getUserEmail from "../../utils/db/user/getUserEmail";
import getUser from "../../utils/db/user/getUser";
import { compareWithHash } from "../../utils/hashPassword";
import { generateToken } from "../../utils/auth";

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

    if (!compareWithHash(password, user.password)) {
      return res.sendStatus(403);
    }

    const token = generateToken(user);

    return res
      .status(202)
      .json({ message: "User logged in successfully!", token });
  } catch (error) {
    return next(error);
  }
}
