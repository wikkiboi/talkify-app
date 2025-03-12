import mongoose from "mongoose";

export default interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text: string;
  timestamp: string;
  updatedAt: Date;
}
