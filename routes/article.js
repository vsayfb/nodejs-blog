import { Router } from "express";
import ArticleController from "../controllers/article.js";
import middlewares from "../middlewares/index.js";
import { createArticleValidate } from "../utils/validations/article.js";

const route = Router();

const article = new ArticleController();

route.post(
  "/new",
  middlewares.isAuth,
  middlewares.validation(createArticleValidate),
  article.create
);

export default route;
