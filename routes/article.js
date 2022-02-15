import { Router } from "express";
import ArticleController from "../controllers/article.js";
import middlewares from "../middlewares/index.js";
import { createArticleValidate } from "../utils/validations/article.js";

const route = Router();

const article = new ArticleController();

route.get("/:id", middlewares.isAuth, article.read);

route.post(
  "/new",
  middlewares.isAuth,
  middlewares.validation(createArticleValidate),
  article.create
);

route.delete("/:id/", middlewares.isAuth, article.delete);

route.patch(
  "/:id",
  middlewares.isAuth,
  middlewares.validation(createArticleValidate),
  article.update
);

export default route;
