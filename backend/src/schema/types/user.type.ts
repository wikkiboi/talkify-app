import mongoose from "mongoose";

export default interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  friends: mongoose.Types.ObjectId[];
  spaces: { name: string; spaceId: mongoose.Types.ObjectId }[];
}
