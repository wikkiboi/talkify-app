import { NextFunction, Request, Response } from "express";
import { getUser, getUserEmail } from "../../utils/db/user";
import createUser from "../../utils/db/user/createUser";
import { hashPassword } from "../../utils/hashPassword";
import generateToken from "../../utils/auth/generateToken";

export default async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    const existingUser = await getUserEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const existingUsername = await getUser(username);
    if (existingUsername) {
      throw new Error("Username is taken");
    }

    const hashedPassword = hashPassword(password);

    const user = await createUser(username, email, hashedPassword);

    const token = generateToken(user);

    return res
      .status(201)
      .json({ message: "User registered successfully!", token });
  } catch (error) {
    return next(error);
  }
}
