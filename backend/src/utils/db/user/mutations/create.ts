import { User } from "../../../../schema/userSchema";

export default async function createUser(
  username: string,
  email: string,
  password: string
) {
  const user = await User.create({
    username,
    email,
    password,
  });
  return user;
}
