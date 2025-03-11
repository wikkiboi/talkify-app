import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "./types";

export const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    sender: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
