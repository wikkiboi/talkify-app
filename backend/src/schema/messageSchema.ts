import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "./types";

export const MessageSchema = new Schema<IMessage>(
  {
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
    // Channel ID, Group ID, or Private DM Users
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      default: null,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "GroupDM",
      default: null,
    },
    dmUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
