import logger from "./logger.js";

export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handleError(res, err) {
  const { statusCode, message } = err;

  if (!statusCode || statusCode === 500) {
    logger.error("app", err.message);
    res.status(500).send("Internal Server Error.");
  } else res.status(statusCode).send(message);
}
