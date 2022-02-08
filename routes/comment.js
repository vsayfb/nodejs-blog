import { Router } from "express";
import CommentController from "../controllers/comment.js";
import middlewares from "../middlewares/index.js";
import { createCommentValidation } from "../utils/validations/comment.js";

const route = Router();

const comment = new CommentController();

route.get("/articleComments", comment.getArticleComments);

route.post(
  "/",
  middlewares.isAuth,
  middlewares.validation(createCommentValidation),
  comment.create
);

route.delete("/", middlewares.isAuth, comment.delete);

export default route;
