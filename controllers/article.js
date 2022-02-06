import ArticleService from "../services/article.js";
import ArticleEvent from "../events/article.js";

export default class ArticleController {
  #service;
  #event;

  constructor() {
    this.#service = new ArticleService();
    this.#event = new ArticleEvent();
  }

  get = async (req, res, next) => {
    try {
      const article = await this.#service.read(req.params.id);

      res.status(200).send(article);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const article = await this.#service.save(req.body);

      this.#event.created(article);

      res.status(201).send(article);
    } catch (error) {
      next(error);
    }
  };
  remove = async (req, res, next) => {
    try {
      const article = await this.#service.remove({
        _id: req.params.id,
      });

      this.#event.deleted(article);

      res.status(200).send("Article Deleted!");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const article = await this.#service.update(req.params.id, req.body);

      res.status(200).send(article);

      this.#event.updated(article);
    } catch (error) {
      next(error);
    }
  };
}
