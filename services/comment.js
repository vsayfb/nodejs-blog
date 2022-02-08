import Comment from "../models/comment.js";
import ArticleService from "../services/article.js";

export default class CommentService {
  save = (doc) => {
    return new Comment(doc).save();
  };

  remove = async (commentId) => {
    return await Comment.findByIdAndRemove(commentId);
  };

  findArticleComments = (articleId) => {
    return Comment.find({ article: articleId }).populate("author", {
      displayName: 1,
    });
  };

  populateDoc = async (doc, path, select) => {
    return Comment.populate(doc, {
      path,
      select,
    });
  };
}
