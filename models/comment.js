import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    origin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    repliesLength: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Comment", CommentSchema);
