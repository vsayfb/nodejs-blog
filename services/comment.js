import Comment from "../models/comment.js";
import ReplyService from "./reply.js";

export default class CommentService {
  #reply;

  constructor() {
    this.#reply = new ReplyService();
  }

  save = (doc) => new Comment(doc).save();

  remove = async (commentId) => {
    await Comment.findByIdAndRemove(commentId);

    await this.#reply.removeMany({ comment: commentId });
  };

  read = (id) => Comment.findById(id);

  increaseRepliesLength = (_id) =>
    Comment.findOneAndUpdate({ _id }, { $inc: { repliesLength: 1 } });

  findArticleComments = (articleId) => {
    return Comment.find({ article: articleId, __t: { $ne: "Reply" } }).populate(
      "origin",
      {
        displayName: 1,
      }
    );
  };

  populateDoc = async (doc, path, select) => {
    return Comment.populate(doc, {
      path,
      select,
    });
  };
}
