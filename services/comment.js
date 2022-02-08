import Comment from "../models/comment.js";

export default class CommentService {
  save = (doc) => {
    return new Comment(doc).save();
  };

  populateDoc = async (doc, path, select) => {
    return Comment.populate(doc, {
      path,
      select,
    });
  };
}
