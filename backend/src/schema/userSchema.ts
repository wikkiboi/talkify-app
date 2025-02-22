import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  friends: mongoose.Types.ObjectId[];
}

export const userSchema = new mongoose.Schema<User>(
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
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<User>("User", userSchema);
