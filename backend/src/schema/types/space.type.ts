import mongoose from "mongoose";

export default interface ISpace extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  color: string;
  admins: [{ userId: mongoose.Types.ObjectId; username: string }];
  members: [
    {
      userId: mongoose.Types.ObjectId;
      username: string;
      status: "online" | "idle" | "offline";
    }
  ];
  invites: [
    {
      code: string;
      expiresAt: Date;
      maxUses: number;
      uses: number;
    }
  ];
  createdAt: Date;
}
