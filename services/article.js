import Article from "../models/article.js";
import { ErrorHandler } from "../utils/errors.js";
import ImageService from "./image.js";
import manipulateTagsField from "../helpers/manipulateTagsField.js";

export default class ArticleService {
  #image = new ImageService();

  async read(_id) {
    const article = await Article.findById(_id)
      .select("content author _id displayTitle description")
      .lean()
      .populate([
        { path: "author", select: { displayName: 1 } },
        { path: "tags" },
      ]);

    if (!article) throw new ErrorHandler("Article Not Found!", 400);

    return article;
  }

  async save(doc) {
    const image = await this.#image.upload(doc.image);

    // it is a file field dont save to db
    delete doc.articleImage;

    const article = await new Article({
      ...doc,
      image,
    }).save();

    return article;
  }

  async remove(data) {
    const article = await Article.findById(data._id);

    await this.#image.remove(article.image);

    await article.delete();

    return article;
  }

  async update(_id, data) {
    const article = await Article.findById(_id);

    const image = await this.#image.update(article.image, data.image);

    // update changed fields
    for (const prop in data) {
      article[prop] = data[prop];
    }

    const tags = manipulateTagsField(data.tags);

    article.tags = tags;
    article.image = image;

    return await article.save();
  }

  async getAuthorArticles(author) {
    return Article.find({ author }).lean();
  }

  async getCount(where) {
    return Article.find(where).count();
  }

  async get(where) {
    return Article.find(where)
      .select("images displayTitle author")
      .populate("author", { password: 0 })
      .lean();
  }

  async getAll() {
    return Article.find({})
      .lean()
      .populate([{ path: "author", select: { password: 0 } }, { path: "tags" }])
      .sort({ createdAt: -1 });
  }

  increaseViews(_id, userHistory) {
    if (!userHistory || JSON.parse(userHistory.indexOf(_id) < 0)) {
      return Article.findOneAndUpdate({ _id }, { $inc: { views: 1 } });
    }
    return;
  }
}
