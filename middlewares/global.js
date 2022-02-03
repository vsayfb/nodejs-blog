import user from "../routes/user.js";
import express from "express";

export default (app) => {
  app.use("/user", user);

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
  });
};
