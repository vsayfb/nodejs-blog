import CommentService from "../services/comment.js";

export default class CommentController {
  #service;

  constructor() {
    this.#service = new CommentService();
  }
  create = () => {};
}
