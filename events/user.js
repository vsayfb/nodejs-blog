import CommonEvent from "../services/event.js";

export default class UserEvent extends CommonEvent {
  constructor() {
    super("user");
  }
  login = (data) => {
    this.logger.info("user/auth", { type: "login", data });
  };
  newAuthor = (user) => {
    this.logger.info("user/auth", { type: "new author", user });
    this.logger.html("new author", 201, `${user.displayName} became a member.`);
  };
}
