import mongoose, { Schema } from "mongoose";
import { IGroupDM } from "./types";

const GroupDMSchema = new Schema<IGroupDM>(
  {
    name: { type: String, required: false },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      validate: [
        (val: Schema.Types.ObjectId[]) => val.length > 2,
        "Group DM must have at least 3 users",
      ],
    },
  },
  { timestamps: true }
);

export const GroupDM = mongoose.model("GroupDM", GroupDMSchema);
