import { User } from "../../../schema/userSchema";

export default async function findUser(username: string) {
  if (!username) return null;
  const user = await User.findOne({ username }).select("_id username");
  return user;
}
