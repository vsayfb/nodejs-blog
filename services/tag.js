import Tag from "../models/tag.js";
import { ErrorHandler } from "../utils/errors.js";
import ArticleService from "../services/article.js";

export default class TagService {
  #article = new ArticleService();

  async read(_id) {
    const tag = await Tag.findById(_id).lean();

    if (!tag) throw new ErrorHandler("Tag Not Found!", 400);

    const articles = await this.#article.get({ tags: { $in: tag } });

    return { tag, articles };
  }

  async readAll() {
    const tags = await Tag.find().lean();

    for (const tag of tags) {
      tag.puplishedArticlesLength = await this.#article.getCount({
        tags: { $in: tag._id },
      });
    }

    return tags;
  }

  save(doc) {
    return new Tag(doc).save();
  }

  async remove(data) {
    const tag = await Tag.findById(data._id);

    await tag.delete();

    return tag;
  }

  async update(_id, data) {
    return await Tag.findByIdAndUpdate(_id, data, { new: true });
  }

  getAll() {
    return Tag.find().lean();
  }

  addMany(docs) {
    return Tag.insertMany(docs);
  }
}
