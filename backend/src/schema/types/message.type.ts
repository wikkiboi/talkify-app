import mongoose from "mongoose";

export default interface IMessage extends Document {
  sender: {
    userId: mongoose.Types.ObjectId;
    username: mongoose.Types.ObjectId;
  };
  text: string;
  channelId?: mongoose.Types.ObjectId;
  groupId?: mongoose.Types.ObjectId;
  dmUsers?: mongoose.Types.ObjectId;
  timestamp: Date;
}
