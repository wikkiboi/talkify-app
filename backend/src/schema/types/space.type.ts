import mongoose from "mongoose";

export default interface ISpace extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  admins: mongoose.Types.ObjectId[];
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}
