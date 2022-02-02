import express from "express";
import config from "./config/index.js";

const app = express();

config(app);

app.get("/", (req, res) => {
  res.status(200).render("home", { message: "Hello World!" });
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Not Found!</h1>");
});

export default app;
