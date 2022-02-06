import CommonEvent from "../services/event.js";

export default class ArticleEvent extends CommonEvent {
  constructor() {
    super("article");
  }
}
