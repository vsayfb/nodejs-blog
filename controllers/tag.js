import TagService from "../services/tag.js";
import TagEvent from "../events/tag.js";

export default class TagController {
  #service = new TagService();
  #event = new TagEvent();

  read = async (req, res, next) => {
    try {
      const tag = await this.#service.read(req.params.id);

      res.status(200).send(tag);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const tag = await this.#service.save(req.body);

      this.#event.created(tag);

      res.status(201).send(tag);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      const tag = await this.#service.remove({
        _id: req.params.id,
      });

      this.#event.deleted(tag);

      res.status(200).send("Tag Deleted!");
    } catch (error) {
      next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const tag = await this.#service.update(req.params.id, req.body);

      res.status(200).send(tag);

      this.#event.updated(tag);
    } catch (error) {
      next(error);
    }
  };
}
