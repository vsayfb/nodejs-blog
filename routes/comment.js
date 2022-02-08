import { Router } from "express";
import CommentController from "../controllers/comment.js";
import middlewares from "../middlewares/index.js";
import { createCommentValidation } from "../utils/validations/comment.js";

const route = Router();

const comment = new CommentController();

route.post(
  "/",
  middlewares.isAuth,
  middlewares.validation(createCommentValidation),
  comment.create
);

export default route;
