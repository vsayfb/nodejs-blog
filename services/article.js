import Article from "../models/article.js";

export default class ArticleService {
  save(doc) {
    return new Article(doc).save();
  }
}
