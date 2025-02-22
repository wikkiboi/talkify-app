import mongoose, { Schema, Document } from "mongoose";

interface Message extends Document {
  sender: mongoose.Types.ObjectId;
  text: string;
  channelId?: mongoose.Types.ObjectId;
  groupId?: mongoose.Types.ObjectId;
  dmUsers?: mongoose.Types.ObjectId;
  timestamp: Date;
}

export const MessageSchema = new Schema<Message>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export const Message = mongoose.model<Message>("Message", MessageSchema);
