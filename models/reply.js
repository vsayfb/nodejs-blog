import mongoose from "mongoose";
import Comment from "./comment.js";

const ReplySchema = new mongoose.Schema(
  {
    comment: { type: mongoose.Types.ObjectId, ref: "Comment" },
    target: { type: mongoose.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default Comment.discriminator("Reply", ReplySchema);
