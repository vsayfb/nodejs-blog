import UserService from "./user.js";
import { generateToken } from "../utils/token.js";
import { hashPassword, comparePassword } from "../utils/password.js";

export default class AuthService {
  #userService = new UserService();

  signUp = async (data) => {
    const password = await hashPassword(data.password);

    return await this.#userService.save({ ...data, password });
  };

  login = async (data) => {
    const { name, password } = data;

    const user = await this.#userService.findOne({
      name,
    });

    await comparePassword(password, user.password);

    // use toObject func for convert to mongoose model to js object
    const self = user.toObject();

    delete self["password"];

    user.lastLogin = Date.now();

    await user.save();

    const token = await generateToken(self);

    return { user: self, token };
  };
}
