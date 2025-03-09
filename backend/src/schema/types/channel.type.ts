import mongoose from "mongoose";

export default interface IChannel extends Document {
  name: string;
  spaceId: mongoose.Types.ObjectId;
  defaultChannel: boolean;
}
