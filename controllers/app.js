import ArticleService from "../services/article.js";
import TagService from "../services/tag.js";
import TagController from "../controllers/tag.js";
import ArticleController from "../controllers/article.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

export default class AppController {
  #article;
  #tag;
  #tagController;
  #articleController;

  constructor() {
    this.#article = new ArticleService();
    this.#tag = new TagService();
    this.#tagController = new TagController();
    this.#articleController = new ArticleController();
  }

  home = async (req, res, next) => {
    this.#articleController.readAll(req, res, next);
  };
  getLogs = (req, res, next) => {
    const result = fs.readFileSync(
      path.join(path.resolve() + "/logs/html.log"),
      "utf8"
    );

    res.status(200).render("logs", { result });
  };
  tagsPage = async (req, res, next) => {
    this.#tagController.readAll(req, res, next);
  };
  articlePage = async (req, res, next) => {
    this.#articleController.read(req, res, next);
  };
  tagPage = async (req, res, next) => {
    this.#tagController.read(req, res, next);
  };
  signUp = (req, res, next) => {
    res.status(200).render("signUp", { title: "Sign Up" });
  };
  login = (req, res, next) => {
    res.status(200).render("login", { title: "Log In" });
  };
  addTag = (req, res, next) => {
    const { token, user } = res.locals;
    res.status(200).render("addTag", { title: "Add Tag", token, user });
  };
  addArticle = async (req, res, next) => {
    const { token, user } = res.locals;

    const tags = await this.#tag.getAll();

    res.status(200).render("addArticle", {
      layout: "dashboard",
      title: "Add Article",
      user,
      tags,
      token,
    });
  };
  dashboard = async (req, res, next) => {
    const { user } = res.locals;

    const articles = await this.#article.getAuthorArticles(user._id);

    res.status(200).render("authorPanel", {
      layout: "dashboard",
      title: "Dashboard",
      articles,
      user,
    });
  };
  updateArticle = async (req, res, next) => {
    try {
      const currentArticle = await this.#article.read(req.params.article);

      const tags = await this.#tag.getAll();

      res.status(200).render("updateArticle", {
        layout: "dashboard",
        title: `Update ${currentArticle.displayTitle}`,
        article: currentArticle,
        tags,
      });
    } catch (error) {
      next(error);
    }
  };
  refreshPasswordPage = (req, res, next) => {
    res.status(200).render("refreshPsw", {
      layout: "dashboard",
      title: "Refresh Password",
      user: res.locals.user,
    });
  };
  checkCodePage = (req, res, next) => {
    res.status(200).render("checkCodePage", { user: res.locals.user });
  };

  newPasswordPage = (req, res, next) => {
    if (
      !mongoose.isValidObjectId(req.query.code) ||
      !mongoose.isValidObjectId(req.query.user)
    ) {
      return res.redirect("/login");
    }

    res.status(200).render("newPasswordPage", { user: res.locals.user });
  };
  forgotPasswordPage = (req, res, next) => {
    res.status(200).render("forgotPassword", {});
  };
  logout = (req, res, next) => {
    res.clearCookie("token");
    res.redirect("/");
  };
}
