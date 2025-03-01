import { NextFunction, Request, Response } from "express";
import getUserEmail from "../../utils/db/user/getUserEmail";
import getUser from "../../utils/db/user/getUser";
import { compareWithHash } from "../../utils/hashPassword";
import { generateToken } from "../../utils/auth";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { usernameOrEmail, password } = req.body;

    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);

    const user = await (isEmail
      ? getUserEmail(usernameOrEmail)
      : getUser(usernameOrEmail));
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (!compareWithHash(password, user.password)) {
      res.sendStatus(403);
      throw new Error("Incorrect username or password");
    }

    const token = generateToken(user);

    return res
      .status(202)
      .json({ message: "User logged in successfully!", token });
  } catch (error) {
    return next(error);
  }
}
