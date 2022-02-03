import User from "../models/user.js";

export default class UserService {
  async save(doc) {
    const user = await new User(doc).save();
    return { user };
  }
}
