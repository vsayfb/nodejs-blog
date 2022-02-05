import fs from "fs";
import path from "path";
import { ErrorHandler } from "../utils/errors.js";

function write(type, folderName, message) {
  const folder = path.join(path.resolve() + `/logs/${folderName}`);

  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  fs.appendFile(
    path.join(path.resolve() + `/logs/${folderName}/${type}.log`),
    type === "error" ? message + "\n" : JSON.stringify(message) + "\n",
    (err) => {
      if (err) {
        fs.writeFileSync("error.log", err.message);
        throw new ErrorHandler(err.message, 500);
      }
    }
  );
}

const logger = {
  info: (folderName, message) => write("info", folderName, message),
  error: (folderName, message) => write("error", folderName, message),
  console: (message) => {
    if (process.env.NODE_ENV !== "production") {
      process.stdout.write(message + "\n");
    }
  },
};

export default logger;
