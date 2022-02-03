import mongoose from "mongoose";
import config from "../config/app.js";

async function connectDB() {
  try {
    await mongoose.connect(config.databaseURI);
    console.log("db connected.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
