import app from "./app.js";
import connectDB from "./loaders/database.js";
import config from "./config/app.js";
import logger from "./utils/logger.js";

connectDB();

async function startServer() {
  app.listen(config.port, () => {
    logger.console(`app is running on port ${config.port}`);
  });
}

startServer().catch((reason) => {
  logger.error("app", reason);
  process.exit(1);
});
