import CommentService from "../services/comment.js";
import ReplyService from "../services/reply.js";

export default class Reply {
  #service;
  #comment;
  constructor() {
    this.#service = new ReplyService();
    this.#comment = new CommentService();
  }

  getRepliesComment = async (req, res, next) => {
    try {
      const replies = await this.#service.getRepliesComment(
        req.headers.comment
      );

      return res.status(200).send(replies);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const reply = await this.#service.save(req.body);

      await this.#comment.increaseRepliesLength(reply.comment);

      const populated = await this.#service.populateDoc(reply);

      return res.status(201).send(populated);
    } catch (error) {
      next(error);
    }
  };
}
