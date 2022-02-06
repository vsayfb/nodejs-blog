import express from "express";
import UserController from "../controllers/user.js";
import { createUserValidate } from "../utils/validations/user.js";
import middlewares from "../middlewares/index.js";

const router = express.Router();

const user = new UserController();

router.post("/signUp", middlewares.validation(createUserValidate), user.register);

router.post("/signIn", user.login);

export default router;
