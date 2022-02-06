import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    text: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Tag", TagSchema);
