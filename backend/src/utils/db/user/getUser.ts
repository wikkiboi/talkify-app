import { User } from "../../../schema/userSchema";

export default async function getUser(username: string) {
  if (!username) return null;
  const user = await User.findOne({ username });
  return user;
}
