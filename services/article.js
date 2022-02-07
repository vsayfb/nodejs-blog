import Article from "../models/article.js";
import { ErrorHandler } from "../utils/errors.js";
import UserService from "./user.js";
import ImageService from "./image.js";

export default class ArticleService {
  #userService = new UserService();
  #image = new ImageService();

  async read(_id) {
    const article = await Article.findById(_id)
      .select("content author _id displayTitle")
      .lean()
      .populate("author", {
        displayName: 1,
      });

    if (!article) throw new ErrorHandler("Article Not Found!", 400);

    return article;
  }

  async save(doc) {
    const articleImage = await this.#image.upload(doc.articleImage);

    // it is a file field dont save to db
    delete doc.articleImage;

    const article = await new Article({
      ...doc,
      images: { article: articleImage },
    }).save();

    return article;
  }

  async remove(data) {
    const article = await Article.findById(data._id);

    await this.#image.remove(article.images.article);

    await article.delete();

    return article;
  }

  async update(_id, data) {
    return await Article.findByIdAndUpdate(_id, data, { new: true });
  }

  async getAuthorArticles(author) {
    return Article.find({ author }).lean();
  }

  async getAll() {
    return Article.find({})
      .lean()
      .populate("author", { displayName: 1, _id: 0 })
      .sort({ createdAt: -1 });
  }
}
