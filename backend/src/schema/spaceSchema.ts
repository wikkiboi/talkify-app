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
    color: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /^#([0-9A-Fa-f]{6})$/.test(value);
        },
        message: (props) => `${props.value} is not a valid hex color!`,
      },
      default: "#95a5a6",
      required: [true, "Please add a color"],
    },
    defaultChannel: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      default: null,
    },
    admins: [
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
        status: {
          type: String,
          enum: ["online", "idle", "offline"],
          default: "offline",
        },
      },
    ],
    invites: [
      {
        code: { type: String, required: true, unique: true },
        expiresAt: { type: Date, required: true },
        maxUses: { type: Number },
        uses: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export const Space = mongoose.model<ISpace>("Space", SpaceSchema);
