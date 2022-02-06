import { ErrorHandler } from "../utils/errors.js";
import UserEvent from "../events/user.js";
import { verifyToken } from "../utils/token.js";

const event = new UserEvent();

export default async (req, res, next) => {
  const authHeader = req.headers && req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[0];

  try {
    if (!token) {
      event.error("Invalid token.");
      throw new ErrorHandler("Invalid token!", 401);
    }

    await verifyToken(token);
    next();
  } catch (error) {
    event.error(error.message);
    next(error);
  }
};
