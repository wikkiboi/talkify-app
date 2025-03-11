import { Schema } from "mongoose";

export default interface IGroupDM extends Document {
  name?: string;
  participants: Schema.Types.ObjectId[];
  owner: Schema.Types.ObjectId;
  createdAt: Date;
}
