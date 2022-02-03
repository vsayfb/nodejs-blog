import express from "express";
import UserController from "../controllers/user.js";

const router = express.Router();

const user = new UserController();

router.post("/new", user.create);

export default router;
