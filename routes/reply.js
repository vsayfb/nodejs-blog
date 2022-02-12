import { Router } from "express";
import middlewares from "../middlewares/index.js";
import ReplyController from "../controllers/reply.js";

const route = Router();

const reply = new ReplyController();

route.get("/repliesComment", reply.getRepliesComment);
route.post("/", middlewares.isAuth, reply.create);

export default route;
