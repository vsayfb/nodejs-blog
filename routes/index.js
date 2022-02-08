import { Router } from "express";
import app from "./app.js";
import article from "./article.js";
import tag from "./tag.js";
import user from "./user.js";

const route = Router();

route.use(app);
route.use("/article", article);
route.use("/tag", tag);
route.use("/tag", tag);
route.use("/user", user);

export default route;
