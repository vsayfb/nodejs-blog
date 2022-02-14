import { ErrorHandler } from "../utils/errors.js";
import UserEvent from "../events/user.js";
import { verifyToken } from "../utils/token.js";

const event = new UserEvent();

export default async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      event.error("Invalid token.");
      throw new ErrorHandler("Invalid token!", 401);
    }

    const result = await verifyToken(token);

    req.token = result;

    next();
  } catch (error) {
    event.error(error.message);
    next(error);
  }
};
