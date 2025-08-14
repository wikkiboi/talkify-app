import { User } from "../../../../schema/userSchema";

export default async function userExists(userId: string) {
  return (await User.exists({ _id: userId })) !== null;
}
