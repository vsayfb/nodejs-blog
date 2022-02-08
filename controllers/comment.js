import CommentService from "../services/comment.js";

export default class CommentController {
  #service;

  constructor() {
    this.#service = new CommentService();
  }
  create = async (req, res, next) => {
    try {
      const comment = await this.#service.save(req.body);

      const populated = await this.#service.populateDoc(comment, "author", {
        displayName: 1,
      });

      return res.status(201).send(populated);
    } catch (error) {
      next(error);
    }
  };
}
