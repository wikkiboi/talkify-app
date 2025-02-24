import mongoose, { Schema, Document } from "mongoose";
import { ISpace } from "./types";

const SpaceSchema = new Schema<ISpace>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const Space = mongoose.model<ISpace>("Space", SpaceSchema);
