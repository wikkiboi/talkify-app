import mongoose, { Schema, Document } from "mongoose";

interface Channel extends Document {
  name: string;
  spaceId: mongoose.Types.ObjectId;
}

export const ChannelSchema = new Schema<Channel>(
  {
    name: {
      type: String,
      required: true,
    },
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
  },
  { timestamps: true }
);

export const Channel = mongoose.model<Channel>("Channel", ChannelSchema);
