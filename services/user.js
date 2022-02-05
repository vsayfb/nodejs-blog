import User from "../models/user.js";
import { ErrorHandler } from "../utils/errors.js";

export default class UserService {
  save(doc) {
    return new User(doc).save();
  }
  async findOne(where) {
    const user = await User.findOne(where);
    if (!user) throw new ErrorHandler("User Not Found!", 400);
    return user;
  }
  async update(doc) {
    return await User.findByIdAndUpdate(doc._id, doc);
  }
}
