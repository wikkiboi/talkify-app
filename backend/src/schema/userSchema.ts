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
          required: true,
        },
        status: {
          type: String,
          enum: ["online", "idle", "offline"],
          default: "offline",
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
