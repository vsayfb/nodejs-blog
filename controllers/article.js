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
      const article = await this.#service.save({ ...req.body, ...req.files });

      res.status(201).send(article._id);

      this.#event.created(article);
    } catch (error) {
      next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const article = await this.#service.read(req.params.id);

      res.status(200).render("article", {
        article,
        title: article.displayTitle,
        user: res.locals.user,
      });
    } catch (error) {
      next(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      const article = await this.#service.remove({
        _id: req.params.id,
      });

      res.status(200).send(article._id);

      this.#event.deleted(article);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  update = async (req, res, next) => {
    const articleImage = req.files ? req.files.articleImage : undefined;

    try {
      const article = await this.#service.update(req.params.id, {
        ...req.body,
        articleImage,
      });

      res.status(200).send(article._id);

      this.#event.updated(article);
    } catch (error) {
      next(error);
    }
  };
}
