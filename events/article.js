import CommonEvent from "../services/event.js";

export default class ArticleEvent extends CommonEvent {
  constructor() {
    super("article");
  }
  created = (user, article) => {
    this.logger.info("article", { type: "created", article });

    this.logger.html(
      "new article",
      201,
      `A user named ${user.displayName} published an article called <a href='/article/${article._id}'>${article.displayTitle}</a>`
    );
  };

  deleted = (user, article) => {
    this.logger.info("article", { type: "deleted", article });

    this.logger.html(
      "new article",
      201,
      `A user named ${user.displayName} deleted an article called ${article.displayTitle}`
    );
  };
}
