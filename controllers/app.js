import ArticleService from "../services/article.js";
import TagService from "../services/tag.js";

export default class AppController {
  #article;
  #tag;

  constructor() {
    this.#article = new ArticleService();
    this.#tag = new TagService();
  }

  home = async (req, res, next) => {
    try {
      const articles = await this.#article.getAll();

      res.status(200).render("home", {
        articles,
        title: "Blog App",
        token: res.locals.token,
        user: res.locals.user,
      });
    } catch (error) {
      next(error);
    }
  };
  signUp = (req, res, next) => {
    res.render("signUp", { title: "Sign Up" });
  };
  login = (req, res, next) => {
    res.render("login", { title: "Log In" });
  };

  addTag = (req, res, next) => {
    const { token, user } = res.locals;
    res.render("addTag", { title: "Add Tag", token, user });
  };

  addArticle = async (req, res, next) => {
    const { token, user } = res.locals;

    const tags = await this.#tag.getAll();

    res.render("addArticle", {
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

    res.render("authorPanel", {
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

      res.render("updateArticle", {
        layout: "dashboard",
        title: `Update ${currentArticle.displayTitle}`,
        article: currentArticle,
        tags,
      });
    } catch (error) {
      next(error);
    }
  };
  logout = (req, res, next) => {
    res.clearCookie("token");
    res.redirect("/");
  };
}
