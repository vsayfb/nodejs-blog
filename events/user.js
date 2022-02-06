import CommonEvent from "../services/event.js";

export default class UserEvent extends CommonEvent {
  constructor() {
    super("user");
  }
}
