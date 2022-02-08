import Tag from "../models/tag.js";
import { ErrorHandler } from "../utils/errors.js";

export default class TagService {
  async read(_id) {
    const article = await Tag.findById(_id);

    if (!article) throw new ErrorHandler("Tag Not Found!", 400);

    return article;
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
