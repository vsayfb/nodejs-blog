import ArticleService from "../services/article.js";
import ArticleEvent from "../events/article.js";

export default class ArticleController {
  #service;
  #event;

  constructor() {
    this.#service = new ArticleService();
    this.#event = new ArticleEvent();
  }

  create = async (req, res, next) => {
    try {
      const article = await this.#service.save(req.body);

      this.#event.created(article);

      res.status(201).send(article);
    } catch (error) {
      this.#event.error(error.message);
      next(error);
    }
  };
}
