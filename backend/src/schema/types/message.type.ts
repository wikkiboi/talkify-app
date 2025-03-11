import mongoose from "mongoose";

export default interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: {
    userId: mongoose.Types.ObjectId;
    username: mongoose.Types.ObjectId;
  };
  text: string;
  timestamp: string;
}
