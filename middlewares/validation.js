import { ErrorHandler } from "../utils/errors.js";
import logger from "../utils/logger.js";

export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    try {
      const msg = error.details[0].message.replace(/"/g, "");
      throw new ErrorHandler(msg, 400);
    } catch (error) {
      next(error);
      // req.baseUrl => /user /comment /article etc..
      logger.error(`${req.baseUrl}/validation`, error.message);
    }
  }
  next();
};
