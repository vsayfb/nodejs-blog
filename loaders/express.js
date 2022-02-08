import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import { handleError } from "../utils/errors.js";
import cookieParser from "cookie-parser";
import hbs from "express-handlebars";
import hbsHelpers from "../helpers/hbsHelpers.js";
import loadTags from "../helpers/loadTags.js";
import routes from "../routes/index.js";

export default (app) => {
  app.set("view engine", "hbs");

  app.engine("hbs", hbs.engine({ extname: ".hbs", helpers: hbsHelpers }));

  app.use(express.json());

  app.use(fileUpload());

  app.use(cookieParser());

  app.use(express.static(path.join(path.resolve() + "/public")));

  app.use(express.static(path.join(path.resolve() + "/uploads")));

  loadTags();

  app.use(routes);

  app.use((req, res, next) => {
    res.status(404).render("404");
  });

  app.use((err, req, res, next) => {
    handleError(res, err);
  });
};
