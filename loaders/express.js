import express from "express";
import { ErrorHandler, handleError } from "../utils/errors.js";
import user from "../routes/user.js";
import article from "../routes/article.js";

export default (app) => {
  app.set("view engine", "hbs");

  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).render("home", { message: "Hello World!" });
  });

  app.use("/user", user);

  app.use("/article", article);

  app.use((req, res, next) => {
    throw new ErrorHandler("Not Found!", 404);
  });

  app.use((err, req, res, next) => {
    handleError(res, err);
  });
};
