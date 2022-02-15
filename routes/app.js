import { Router } from "express";
import middlewares from "../middlewares/index.js";
import AppController from "../controllers/app.js";

const route = Router();

const app = new AppController();

route.get("/", middlewares.detectUser, app.home);
route.get("/logs", middlewares.detectUser, app.getLogs);
route.get("/tags", middlewares.detectUser, app.tagsPage);
route.get("/login", middlewares.redirectIfToken, app.login);
route.get("/signUp", middlewares.redirectIfToken, app.signUp);
route.get("/article/:id", middlewares.detectUser, app.articlePage);
route.get("/tag/:id", middlewares.detectUser, app.tagPage);
route.get("/addTag", middlewares.routeProtection, app.addTag);
route.get("/addArticle", middlewares.routeProtection, app.addArticle);
route.get(
  "/refreshPassword",
  middlewares.routeProtection,
  app.refreshPasswordPage
);
route.get("/dashboard/:user", middlewares.routeProtection, app.dashboard);
route.get("/update/:article", middlewares.routeProtection, app.updateArticle);
route.get("/checkCode", middlewares.detectUser, app.checkCodePage);
route.get("/newPassword", middlewares.detectUser, app.newPasswordPage);

route.get("/logout", app.logout);

export default route;
