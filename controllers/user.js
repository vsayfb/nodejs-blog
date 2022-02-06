import UserEvent from "../events/user.js";
import AuthService from "../services/auth.js";
import UserService from "../services/user.js";

export default class UserController {
  #service;
  #event;
  #auth;

  constructor() {
    this.#service = new UserService();
    this.#event = new UserEvent();
    this.#auth = new AuthService();
  }

  create = async (req, res, next) => {
    try {
      const user = await this.#auth.signUp(req.body);

      this.#event.created(user);

      res.status(201).send("User created");
    } catch (error) {
      this.#event.appError(error.message);
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { user, token } = await this.#auth.signIn(req.body);

      this.#event.emit("signIn", user);

      return res.status(200).json({ user, token });
    } catch (error) {
      if (error.status === 400) this.#event.emit("not found", error.message);
      else this.#event.appError(error.message);
      next(error);
    }
  };
}
