import { async } from "regenerator-runtime";
import AuthService from "../services/auth.js";
import UserService from "../services/user.js";
import { ErrorHandler } from "../utils/errors.js";
import eventEmitter from "../utils/events.js";

export default class UserController {
  #service;
  #event;
  #auth;

  constructor() {
    this.#service = new UserService();
    this.#event = eventEmitter;
    this.#auth = new AuthService();
  }

  create = async (req, res, next) => {
    try {
      const user = await this.#auth.signUp(req.body);

      this.#event.emit("created", user);

      res.status(201).send("User created");
    } catch (error) {
      this.#event.emit("error", error.message);
      res.status(500).send("Internal Server Error!");
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { user, token } = await this.#auth.signIn(req.body);

      this.#event.emit("signIn", user);

      return res.status(200).json({ user, token });
    } catch (error) {
      if (error.status === 400) this.#event.emit("not found", error.message);
      else this.#event.emit("error", error.message);
      next(error);
    }
  };
}
