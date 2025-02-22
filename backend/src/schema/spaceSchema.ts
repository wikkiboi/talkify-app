import mongoose, { Schema, Document } from "mongoose";

interface Space extends Document {
  name: string;
  channels: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const SpaceSchema = new Schema<Space>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

export const Space = mongoose.model<Space>("Space", SpaceSchema);
