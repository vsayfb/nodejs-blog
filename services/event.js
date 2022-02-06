import logger from "../utils/logger.js";

export default class CommonEvent {
  constructor(model) {
    this.model = model;
    this.logger = logger;
    this.model = model;
  }

  created = (data) => {
    this.logger.info(this.model, { type: "created", data });
  };
  deleted = (data) => {
    this.logger.info(this.model, { type: "deleted", data });
  };
  error = (error) => {
    this.logger.error(this.model, error);
  };
  updated = (data) => {
    this.logger.info(this.model, { type: "updated", data });
  };

  appError = (error) => {
    this.logger.error("app", error.message);
  };
}
