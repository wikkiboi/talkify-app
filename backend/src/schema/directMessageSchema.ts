import mongoose, { Schema } from "mongoose";
import { IDirectMessage } from "./types";

const DirectMessageSchema = new Schema<IDirectMessage>(
  {
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: [
        (val: Schema.Types.ObjectId[]) => val.length === 2,
        "DM must have exactly 2 users",
      ],
    },
  },
  { timestamps: true }
);

export const DirectMessage = mongoose.model(
  "DirectMessage",
  DirectMessageSchema
);
