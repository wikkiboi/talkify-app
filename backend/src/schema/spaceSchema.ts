import mongoose, { Schema } from "mongoose";
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
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          unique: true,
        },
        username: {
          type: String,
          required: true,
        },
      },
    ],
    members: [
      {
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
    ],
  },
  { timestamps: true }
);

export const Space = mongoose.model<ISpace>("Space", SpaceSchema);
