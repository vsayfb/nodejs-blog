import { Router } from "express";
import ArticleController from "../controllers/article.js";
import middlewares from "../middlewares/index.js";
import { createArticleValidate } from "../utils/validations/article.js";

const route = Router();

const article = new ArticleController();

route.get("/:id", article.get);

route.post(
  "/new",
  middlewares.isAuth,
  middlewares.validation(createArticleValidate),
  article.create
);

route.delete("/delete/:id/", middlewares.isAuth, article.remove);

route.patch(
  "/update/:id",
  middlewares.isAuth,
  middlewares.validation(createArticleValidate),
  article.update
);

export default route;
