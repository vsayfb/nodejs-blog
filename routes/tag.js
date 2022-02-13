import { Router } from "express";
import middlewares from "../middlewares/index.js";
import TagController from "../controllers/tag.js";
import { tagValidation } from "../utils/validations/tag.js";
const route = Router();

const tag = new TagController();

route.get("/all", tag.readAll);
route.get("/:id", tag.read);

route.post(
  "/new",
  middlewares.isAuth,
  middlewares.validation(tagValidation),
  tag.create
);

route.patch(
  "/update/:id",
  middlewares.isAuth,
  middlewares.validation(tagValidation),
  tag.update
);

route.delete("/delete/:id", middlewares.isAuth, tag.delete);

export default route;
