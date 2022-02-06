import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    displayTitle: { type: String },
    description: { type: String },
    content: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: { type: [mongoose.Schema.Types.ObjectId], ref: "Tag" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { versionKey: false }
);

export default mongoose.model("Article", ArticleSchema);
