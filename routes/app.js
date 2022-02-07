import { Router } from "express";
import ArticleService from "../services/article.js";
import middlewares from "../middlewares/index.js";
import jsonwebtoken from "jsonwebtoken";
const route = Router();

route.get("/", middlewares.checkToken, async (req, res, next) => {
  try {
    const articles = await new ArticleService().getAll();

    res.status(200).render("home", {
      articles,
      title: "Blog App",
      token: res.locals.token,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
});

route.get(
  "/signUp",
  (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next();
        else return res.redirect("/");
      });
    } else next();
  },
  (req, res, next) => {
    res.render("signUp", { title: "Sign Up" });
  }
);

route.get("/addTag", middlewares.routeProtection, (req, res, next) => {
  const { token, user } = res.locals;

  res.render("addTag", { title: "Add Tag", token, user });
});

route.get("/addArticle", middlewares.routeProtection, (req, res, next) => {
  const { token, user } = res.locals;

  res.render("addArticle", {
    title: "Add Article",
    user,
    token,
  });
});

route.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default route;