import eventEmitter from "../utils/events.js";
import UserService from "../services/user.js";

export default class UserController {
  #service = new UserService();

  create = async (req, res, next) => {
    try {
      const user = await this.#service.save(req.body);

      eventEmitter.emit("created", user);

      res.status(201).send("User created");
    } catch (error) {
      res.status(500).send("Internal Server Error!");
      console.log(error);
    }
  };
}
