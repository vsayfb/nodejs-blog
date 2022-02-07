import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import { ErrorHandler, handleError } from "../utils/errors.js";
import cookieParser from "cookie-parser";
import user from "../routes/user.js";
import article from "../routes/article.js";
import tag from "../routes/tag.js";
import appRoutes from "../routes/app.js";
import hbs from "express-handlebars";
import { verifyToken } from "../utils/token.js";

export default (app) => {
  app.set("view engine", "hbs");

  const helpers = {
    toDate: (date) => new Date(date).toDateString(),
    isDefined: (value) => value != undefined,
    isNotDefined: (value) => value == undefined,
  };

  app.engine("hbs", hbs.engine({ extname: ".hbs", helpers }));

  app.use(express.json());

  app.use(fileUpload());

  app.use(cookieParser());

  app.use(express.static(path.join(path.resolve() + "/public")));

  app.use(express.static(path.join(path.resolve() + "/uploads")));

  app.use(appRoutes);

  app.use("/user", user);

  app.use("/article", article);

  app.use("/tag", tag);

  app.use((req, res, next) => {
    throw new ErrorHandler("Not Found!", 404);
  });

  app.use((err, req, res, next) => {
    handleError(res, err);
  });
};
