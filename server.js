import app from "./app.js";
import connectDB from "./loaders/database.js";
import config from "./config/app.js";

connectDB();

async function startServer() {
  app.listen(config.port, () => {
    console.log(`app is running on port ${config.port}`);
  });
}

startServer().catch((reason) => {
  console.error(reason);
  process.exit(1);
});
