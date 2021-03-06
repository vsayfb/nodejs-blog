import { Router } from "express";
import app from "./app.js";
import article from "./article.js";
import tag from "./tag.js";
import user from "./user.js";
import comment from "./comment.js";
import reply from "./reply.js";

const route = Router();

route.use(app);
route.use("/article", article);
route.use("/tag", tag);
route.use("/tag", tag);
route.use("/user", user);
route.use("/comment", comment);
route.use("/reply", reply);

export default route;
