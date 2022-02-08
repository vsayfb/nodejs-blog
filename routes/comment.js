import { Router } from "express";
import CommentController from "../controllers/comment.js";
import middlewares from "../middlewares/index.js";

const route = Router();

const comment = new CommentController();

route.post("/:id", middlewares.isAuth, comment.create);
