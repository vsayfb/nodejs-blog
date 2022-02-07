import CommonEvent from "../services/event.js";

export default class UserEvent extends CommonEvent {
  constructor() {
    super("user");
  }
  login = (data) => {
    this.logger.info("user/auth", { type: "login", data });
  };
  signUp = (data) => {
    this.logger.info("user/auth", { type: "signUp", data });
  };
}
