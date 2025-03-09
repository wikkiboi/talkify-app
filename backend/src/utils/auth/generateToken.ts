import jwt from "jsonwebtoken";
import { InferSchemaType } from "mongoose";
import { userSchema } from "../../schema/userSchema";

type User = InferSchemaType<typeof userSchema>;

export default function generateToken(user: User) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing in environment");
  }

  const userInfo = {
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    },
  };
  const userJSON = JSON.stringify(userInfo);

  const token = jwt.sign(userJSON, process.env.JWT_SECRET);
  return token;
}
