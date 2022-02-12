import CommentService from "../services/comment.js";

export default class CommentController {
  #service;

  constructor() {
    this.#service = new CommentService();
  }
  create = async (req, res, next) => {
    try {
      const comment = await this.#service.save(req.body);

      const populated = await this.#service.populateDoc(comment, "origin", {
        displayName: 1,
      });

      return res.status(201).send(populated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await this.#service.remove(req.headers.comment);

      res.status(200).send("Deleted.");
    } catch (error) {
      next(error);
    }
  };

  getArticleComments = async (req, res, next) => {
    try {
      const comments = await this.#service.findArticleComments(
        req.headers.article
      );

      return res.status(200).send(comments);
    } catch (error) {
      next(error);
    }
  };
}
