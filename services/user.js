import { compare } from "bcrypt";
import User from "../models/user.js";
import { ErrorHandler } from "../utils/errors.js";
import { comparePassword } from "../utils/password.js";

export default class UserService {
  save(doc) {
    return new User(doc).save();
  }

  async checkPassword(_id, password) {
    const user = await User.findOne({ _id });

    if (!user) throw new ErrorHandler("User doesn't exists!", 400);

    await comparePassword(password, user.password);

    return user;
  }

  async findOne(where) {
    const user = await User.findOne(where);
    if (!user) throw new ErrorHandler("User Not Found!", 400);
    return user;
  }
  async update(_id, doc) {
    return await User.findByIdAndUpdate(_id, doc);
  }
}
