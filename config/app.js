import dotenv from "dotenv";

const env = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (env.error) {
  throw new Error("Couldn't find .env file!");
}

export default {
  port: parseInt(process.env.PORT, 10),

  loadCustomTag: process.env.LOAD_CUSTOM_TAG,

  databaseURI: process.env.DB_URI,

  jwtSecret: process.env.JWT_SECRET,
};
