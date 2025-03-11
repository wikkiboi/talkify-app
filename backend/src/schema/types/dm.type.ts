import { Schema } from "mongoose";

export default interface IDirectMessage extends Document {
  participants: [Schema.Types.ObjectId, Schema.Types.ObjectId];
  createdAt: Date;
}
