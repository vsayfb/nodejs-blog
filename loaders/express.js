import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import { handleError } from "../utils/errors.js";
import cookieParser from "cookie-parser";
import user from "../routes/user.js";
import article from "../routes/article.js";
import tag from "../routes/tag.js";
import appRoutes from "../routes/app.js";
import hbs from "express-handlebars";
import hbsHelpers from "../helpers/hbsHelpers.js";
import loadTags from "../helpers/loadTags.js";

export default (app) => {
  app.set("view engine", "hbs");

  app.engine("hbs", hbs.engine({ extname: ".hbs", helpers: hbsHelpers }));

  app.use(express.json());

  app.use(fileUpload());

  app.use(cookieParser());

  app.use(express.static(path.join(path.resolve() + "/public")));

  app.use(express.static(path.join(path.resolve() + "/uploads")));

  loadTags();

  app.use(appRoutes);

  app.use("/user", user);

  app.use("/article", article);

  app.use("/tag", tag);

  app.use((req, res, next) => {
    res.status(404).render("404");
  });

  app.use((err, req, res, next) => {
    handleError(res, err);
  });
};
