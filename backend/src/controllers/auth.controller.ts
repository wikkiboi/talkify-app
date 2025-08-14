import { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/auth";
import { compareWithHash, hashPassword } from "../utils/hashPassword";
import { createUser, getUser, getUserEmail } from "../utils/db/user";

export async function login(
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

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
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
