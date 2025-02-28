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
    friends: [{ type: Schema.Types.ObjectId }],
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
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
