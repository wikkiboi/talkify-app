import mongoose, { Schema } from "mongoose";
import { IGroupDM } from "./types";

const GroupDMSchema = new Schema<IGroupDM>(
  {
    name: { type: String, required: false },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const GroupDM = mongoose.model("GroupDM", GroupDMSchema);
