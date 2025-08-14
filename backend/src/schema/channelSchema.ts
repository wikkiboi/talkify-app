import mongoose, { Schema } from "mongoose";
import { IChannel } from "./types";

export const ChannelSchema = new Schema<IChannel>(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

export const Channel = mongoose.model<IChannel>("Channel", ChannelSchema);
