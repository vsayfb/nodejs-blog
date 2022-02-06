import CommonEvent from "../services/event.js";

export default class TagEvent extends CommonEvent {
  constructor() {
    super("tag");
  }
}
