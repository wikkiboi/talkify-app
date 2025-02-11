import { User } from "../../../schema/userSchema";

export default async function getUserEmail(email: string) {
  if (!email) return null;
  const user = await User.findOne({ email });
  return user;
}
