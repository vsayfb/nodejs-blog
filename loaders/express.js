import express from "express";
import middlewares from "../middlewares/index.js";

export default (app) => {
  app.set("view engine", "hbs");

  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).render("home", { message: "Hello World!" });
  });

  middlewares.global(app);
};
