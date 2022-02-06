import EventEmitter from "events";
import logger from "../utils/logger.js";

export default class CommonEvent {
  #logger;
  constructor(model) {
    this.model = model;
    this.#logger = logger;
    this.model = model;
  }

  created = (data) => {
    this.#logger.info(this.model, data);
  };
  error = (error) => {
    this.#logger.error(this.model, error);
  };

  appError = (error) => {
    this.#logger.error("app", error.message);
  };
}
