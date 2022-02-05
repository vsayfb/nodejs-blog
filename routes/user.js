import express from "express";
import UserController from "../controllers/user.js";
import validation from "../middlewares/validation.js";
import AuthService from "../services/auth.js";
import { createUserValidate } from "../utils/validations/user.js";

const router = express.Router();

const user = new UserController();

router.post("/signUp", validation(createUserValidate), user.create);

router.post("/signIn", user.signIn);

export default router;
