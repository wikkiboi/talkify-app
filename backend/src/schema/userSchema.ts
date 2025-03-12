import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./types";

export const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    friends: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
        },
        status: {
          type: String,
          enum: ["online", "idle", "offline"],
          default: "offline",
          required: true,
        },
        friendStatus: {
          type: String,
          enum: ["accepted", "pending", "requested"],
          required: true,
        },
      },
    ],
    spaces: [
      {
        name: {
          type: String,
        },
        spaceId: {
          type: Schema.Types.ObjectId,
          ref: "Space",
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
        lastVisitedChannel: {
          type: Schema.Types.ObjectId,
          ref: "Channel",
          default: null,
        },
      },
    ],
    status: {
      type: String,
      enum: ["online", "idle", "offline"],
      default: "offline",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
