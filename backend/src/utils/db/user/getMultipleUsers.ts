import { User } from "../../../schema/userSchema";

export default async function getMultipleUsers(userIds: string[]) {
  const users = await User.find({ _id: { $in: userIds } }, "_id");

  return users;
}
