import UserEvent from "../events/user.js";
import AuthService from "../services/auth.js";
import UserService from "../services/user.js";
import { generateToken } from "../utils/token.js";

export default class UserController {
  #service;
  #event;
  #auth;

  constructor() {
    this.#service = new UserService();
    this.#event = new UserEvent();
    this.#auth = new AuthService();
  }

  register = async (req, res, next) => {
    try {
      const user = await this.#auth.signUp(req.body);

      const token = await generateToken(user);

      res.cookie("token", token);

      res.status(201).send("User Created!");

      this.#event.signUp(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { user, token } = await this.#auth.login(req.body);

      this.#event.login(user);

      return res.status(200).json({ user, token });
    } catch (error) {
      if (error.status === 400) this.#event.emit("not found", error.message);
      next(error);
    }
  };
}
