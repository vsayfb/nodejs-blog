import mongoose from "mongoose";
import config from "../config/app.js";
import logger from "../utils/logger.js";

async function connectDB() {
  try {
    await mongoose.connect(config.databaseURI);
    logger.console("db connected.");
  } catch (error) {
    logger.error("app", error.message);
    logger.console(error);
    process.exit(1);
  }
}

export default connectDB;
