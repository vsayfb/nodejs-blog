import UserEvent from "../events/user.js";
import AuthService from "../services/auth.js";
import UserService from "../services/user.js";
import MailService from "../services/mail.js";
import RandomNumber from "../services/randomNum.js";
import { generateToken } from "../utils/token.js";
import { hashPassword } from "../utils/password.js";

export default class UserController {
  #service;
  #event;
  #auth;
  #mail;

  constructor() {
    this.#service = new UserService();
    this.#event = new UserEvent();
    this.#auth = new AuthService();
    this.#mail = new MailService();
  }

  register = async (req, res, next) => {
    try {
      const user = await this.#auth.signUp(req.body);

      const token = await generateToken(user);

      res.cookie("token", token);

      res.status(201).send("User Created!");

      this.#event.newAuthor(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { user, token } = await this.#auth.login(req.body);

      this.#event.login(user);

      res.cookie("token", token);

      return res.status(200).send("Success.");
    } catch (error) {
      if (error.status === 400) this.#event.emit("not found", error.message);
      next(error);
    }
  };

  refreshPsw = async (req, res, next) => {
    try {
      const user = await this.#service.checkPassword(
        req.token._id,
        req.body.password
      );

      const { num: code, _id } = await RandomNumber.create();

      await this.#mail.sendCodeToMail(user.email, code);

      return res.status(200).send(`/checkCode?user=${user._id}&code=${_id}`);
    } catch (error) {
      next(error);
    }
  };

  checkCodeForNewPassword = async (req, res, next) => {
    try {
      const { code, user } = req.headers;

      await RandomNumber.verifySubmittedCode(code, req.body.code);

      res.status(200).send(`/newPassword?user=${user}&code=${code}`);
    } catch (error) {
      next(error);
    }
  };

  findEmailForForgotPsw = async (req, res, next) => {
    try {
      const user = await this.#service.findByEmail(req.query.email);

      const { num: code, _id } = await RandomNumber.create();

      await this.#mail.sendCodeToMail(user.email, code);

      res.status(200).send(`/checkCode?user=${user._id}&code=${_id}`);
    } catch (error) {
      next(error);
    }
  };

  newPassword = async (req, res, next) => {
    try {
      const { code, user } = req.headers;

      const hashed = await hashPassword(req.body.password);

      await RandomNumber.removeSubmittedCode(code);

      await this.#service.update(user, { password: hashed });

      res.status(200).send("Your password has been changed.");
    } catch (error) {
      next(error);
    }
  };
}
