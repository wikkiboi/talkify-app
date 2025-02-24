import mongoose from "mongoose";

export default interface ISpace extends Document {
  name: string;
  channels: mongoose.Types.ObjectId[];
  createdAt: Date;
}
