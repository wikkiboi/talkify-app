import mongoose from "mongoose";

export default interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  username: string;
  email: string;
  password: string;
  friends: {
    userId: mongoose.Types.ObjectId;
    username: mongoose.Types.ObjectId;
    status: "online" | "idle" | "offline";
    friendStatus: "accepted" | "pending" | "requested";
  }[];
  spaces: {
    name: string;
    spaceId: mongoose.Types.ObjectId;
    color: string;
    lastVisitedChannel: mongoose.Types.ObjectId | null;
    defaultChannel: string;
  }[];
  status: "online" | "idle" | "offline";
  createdAt: Date;
}
