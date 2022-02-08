import { Router } from "express";
import middlewares from "../middlewares/index.js";
import AppController from "../controllers/app.js";

const route = Router();

const app = new AppController();

route.get("/", middlewares.detectUser, app.home);

route.get("/login", middlewares.verifyAuth, app.login);

route.get("/signUp", middlewares.verifyAuth, app.signUp);

route.get("/addTag", middlewares.routeProtection, app.addTag);

route.get("/addArticle", middlewares.routeProtection, app.addArticle);

route.get("/dashboard/:user", middlewares.routeProtection, app.dashboard);

route.get("/update/:article", middlewares.routeProtection, app.updateArticle);

route.get("/logout", app.logout);

export default route;
