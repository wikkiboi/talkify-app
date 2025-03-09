import mongoose from "mongoose";

export default interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  friends: {
    userId: mongoose.Types.ObjectId;
    username: mongoose.Types.ObjectId;
    status: "online" | "idle" | "offline";
  }[];
  spaces: {
    name: string;
    spaceId: mongoose.Types.ObjectId;
    color: string;
    lastVisitedChannel: mongoose.Types.ObjectId | null;
  }[];
  status: "online" | "idle" | "offline";
}
