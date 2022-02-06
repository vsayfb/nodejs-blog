import CommonEvent from "../services/event.js";

export default class UserEvent extends CommonEvent {
  constructor() {
    super("user");
  }
  signIn = (data) => {
    this.logger.info("user/auth", { type: "signIn", data });
  };
  signUp = (data) => {
    this.logger.info("user/auth", { type: "signUp", data });
  };
}
