import { Response } from "express";
import { Request } from "express-jwt";
import getUser from "../../utils/db/user/getUser";

export default async function userGetSpaces(
  req: Request,
  res: Response
): Promise<any> {
  const { username } = req.auth?.user;
  const user = await getUser(username);
  if (!user) {
    res.status(404);
    throw new Error("Create Space Error: User not found");
  }

  return res.status(201).json({ spaces: user.spaces });
}
