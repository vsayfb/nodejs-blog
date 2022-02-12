import Reply from "../models/reply.js";

export default class ReplyService {
  constructor() {}

  save(doc) {
    return new Reply(doc).save();
  }

  remove(_id) {
    return Reply.findByIdAndDelete(_id);
  }

  populateDoc = async (doc) => {
    return Reply.populate(doc, [
      { path: "origin", select: { displayName: 1 } },
      { path: "target", select: { displayName: 1 } },
    ]);
  };

  getRepliesComment(commentId) {
    return Reply.find({ comment: commentId }).populate([
      { path: "origin", select: { displayName: 1 } },
      { path: "target", select: { displayName: 1 } },
    ]);
  }

  removeMany(where) {
    return Reply.deleteMany(where);
  }
}
