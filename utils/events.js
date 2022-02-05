import EventEmitter from "events";
import logger from "./logger.js";

const eventEmitter = new EventEmitter();

export default eventEmitter;

eventEmitter.on("created", (data) => {
  data.type = "created";
  logger.info("user", data);
});

eventEmitter.on("signIn", (data) => {
  data.type = "signIn";
  logger.info("user", data);
});

eventEmitter.on("not found", (data) => {
  data.type = "not found";
  logger.error("user", data);
});

eventEmitter.on("error", (data) => {
  logger.error("app", data);
});
