import Article from "../models/article.js";
import { ErrorHandler } from "../utils/errors.js";
import UserService from "./user.js";

export default class ArticleService {
  #userService = new UserService();

  async read(_id) {
    const article = await Article.findById(_id).populate("author", {
      password: 0,
    });

    if (!article) throw new ErrorHandler("Article Not Found!", 400);

    return article;
  }

  save(doc) {
    return new Article(doc).save();
  }

  async remove(data) {
    const article = await Article.findById(data._id);

    await article.delete();

    return article;
  }

  async update(_id, data) {
    console.log(data);
    return await Article.findByIdAndUpdate(_id, data, { new: true });
  }
}
