import user from "../routes/user.js";
import { handleError, ErrorHandler } from "../utils/errors.js";

export default (app) => {
  app.use("/user", user);

  app.use((req, res, next) => {
    throw new ErrorHandler("Not Found!", 404);
  });

  app.use((err, req, res, next) => {
    handleError(res, err);
  });
};
