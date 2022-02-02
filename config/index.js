import dotenv from "dotenv";

export default (app) => {
  dotenv.config();
  app.set("view engine", "hbs");
};
