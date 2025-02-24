import mongoose, { Schema, Document } from "mongoose";
import { ISpace } from "./types";

const SpaceSchema = new Schema<ISpace>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

export const Space = mongoose.model<ISpace>("Space", SpaceSchema);
