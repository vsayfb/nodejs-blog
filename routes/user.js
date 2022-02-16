import express from "express";
import UserController from "../controllers/user.js";
import { createUserValidate } from "../utils/validations/user.js";
import middlewares from "../middlewares/index.js";

const router = express.Router();

const user = new UserController();

router.get("/forgotPassword", user.findEmailForForgotPsw);

router.post(
  "/signUp",
  middlewares.validation(createUserValidate),
  user.register
);

router.put("/refreshPassword", middlewares.isAuth, user.refreshPsw);

router.post("/checkCode", user.checkCodeForNewPassword);

router.patch("/newPassword", user.newPassword);

router.post("/login", user.login);

export default router;
